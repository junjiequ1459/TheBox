export const updateUser = (user) => ({
  type: "UPDATE_USER",
  user,
});

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      const updatedUser = action.user;
      const updatedUsers = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        } else {
          return user;
        }
      });
      return { ...state, users: updatedUsers };
    default:
      return state;
  }
};

export default usersReducer;
