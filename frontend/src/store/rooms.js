import jwtFetch from "./jwt";

const RECEIVE_ROOM = "rooms/RECEIVE_ROOM";
const RECEIVE_ROOMS = "rooms/RECEIVE_ROOMS";
const REMOVE_ROOM = "rooms/REMOVE_ROOM";

const receiveRoom = (room) => ({
  type: RECEIVE_ROOM,
  room,
});

const receiveRooms = (rooms) => ({
  type: RECEIVE_ROOMS,
  rooms,
});

const removeRoom = (room) => ({
  type: REMOVE_ROOM,
  room,
});

export const fetchRoom = (roomId) => async (dispatch) => {
  const res = await jwtFetch(`/api/rooms/${roomId}`);
  const room = await res.json();
  return dispatch(receiveRoom(room));
};

export const fetchRooms =
  (search = "") =>
  async (dispatch) => {
    const res = await jwtFetch("/api/rooms");
    if (res.ok) {
      const rooms = await res.json();
      const filteredRooms = Object.keys(rooms).reduce((filtered, key) => {
        if (rooms[key].name.includes(search)) {
          filtered[key] = rooms[key];
        }
        return filtered;
      }, {});
      dispatch(receiveRooms(filteredRooms));
    }
  };

export const createRoom = (room) => async (dispatch) => {
  const res = await jwtFetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });
  const newRoom = await res.json();
  dispatch(receiveRoom(newRoom));
};

export const updateRoom = (room) => async (dispatch) => {
  const res = await jwtFetch(`/api/rooms/${room._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });
  const updatedRoom = await res.json();
  if (updatedRoom) {
    dispatch(receiveRoom(updatedRoom));
  } else {
    dispatch(removeRoom(room));
    dispatch(fetchRooms(""));
  }
};

// export const deleteRoom = (room) => async (dispatch) => {
//   const res = await jwtFetch(`/api/rooms/${room._id}`, {
//     method: "DELETE",
//   });
//   dispatch(removeRoom(room));
// };

const roomsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_ROOM:
      newState[action.room._id] = action.room;
      return newState;
    case RECEIVE_ROOMS:
      return { ...action.rooms };
    case REMOVE_ROOM:
      delete newState[0];
      return newState;
    default:
      return state;
  }
};

export default roomsReducer;
