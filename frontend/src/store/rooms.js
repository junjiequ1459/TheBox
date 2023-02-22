const RECEIVE_ROOM = "rooms/RECEIVE_ROOM";
const RECEIVE_ROOMS = "rooms/RECEIVE_ROOMS";

const receiveRoom = (room) => ({
  type: RECEIVE_ROOM,
  room,
});

const receiveRooms = (rooms) => ({
  type: RECEIVE_ROOMS,
  rooms,
});

export const fetchRoom = (roomId) => async (dispatch) => {
  const res = await fetch(`/rooms/${roomId}`);
  const room = await res.json();
  return dispatch(receiveRoom(room));
};

export const fetchRooms = () => async (dispatch) => {
  const res = await fetch("/api/rooms");
  if (res.ok) {
    const rooms = await res.json();
    dispatch(receiveRooms(rooms));
  }
};

const roomsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ROOM:
      return { ...state, [action.room.id]: action.room };
    case RECEIVE_ROOMS:
      return { ...state, ...action.rooms };
    default:
      return state;
  }
};

export default roomsReducer;
