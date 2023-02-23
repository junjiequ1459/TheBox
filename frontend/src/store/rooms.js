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

const removeRoom = (roomId) => ({
  type: REMOVE_ROOM,
  roomId,
});

export const fetchRoom = (roomId) => async (dispatch) => {
  const res = await jwtFetch(`/api/rooms/${roomId}`);
  const room = await res.json();
  return dispatch(receiveRoom(room));
};

export const fetchRooms = () => async (dispatch) => {
  const res = await jwtFetch("/api/rooms");
  if (res.ok) {
    const rooms = await res.json();
    dispatch(receiveRooms(rooms));
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
  return newRoom._id
};

export const updateRoom = (room) => async (dispatch) => {
  console.log('hit thunk')
  const res = await jwtFetch(`/api/rooms/${room._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });
  const updatedRoom = await res.json();
  dispatch(receiveRoom(updatedRoom));
};

export const deleteRoom = (roomId) => async (dispatch) => {
  const res = await jwtFetch(`/api/rooms${roomId}`, {
    method: "DELETE",
  });
  dispatch(removeRoom(roomId));
};

const roomsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_ROOM:
      return { 0: action.room };
    case RECEIVE_ROOMS:
      return { ...action.rooms };
    case REMOVE_ROOM:
      delete newState[action.roomId];
      return newState;
    default:
      return state;
  }
};

export default roomsReducer;
