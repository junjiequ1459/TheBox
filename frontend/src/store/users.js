import jwtFetch from "./jwt";

const RECEIVE_USERS = "users/RECEIVE_USERS";
const RECEIVE_USER = "users/RECEIVE_USER";

export const updateUser = (user) => ({
  type: "UPDATE_USER",
  user,
});

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});


const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

// export const updateUser = (user) => async (dispatch) => {
//   const response = await jwtFetch(`/api/${user._id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(user)
//   })
//   const updatedUser = await response.json();
//   dispatch(receiveUser(updatedUser))
// }

export const fetchUsers = () => async (dispatch) => {
  const response = await jwtFetch("/api/users");
  const users = await response.json();
  dispatch(receiveUsers(users));
}; //need to edit reducer

export const fetchUser = (userId) => async (dispatch) => {
  const response = await jwtFetch(`/api/users/${userId}`);
  const user = await response.json();
  dispatch(receiveUser(user));
}; //need to edit reducer

const usersReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "UPDATE_USER":
      // const updatedUsers = state.users.map((user) => {
      //   if (user.id === updatedUser.id) {
      //     return updatedUser;
      //   } else {
      //     return user;
      //   }
      // });
      return { ...state, users: action.user };
    case RECEIVE_USER:
      return (newState[action.user] = action.user);
    case RECEIVE_USERS:
      return {...action.users };
    default:
      return state;
  }
};

export default usersReducer;
