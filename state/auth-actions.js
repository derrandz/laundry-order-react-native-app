// These are action creators that expect you to be using redux-thunk as a store middleware

const saveCurrentUser = (currentUser) => ({
  type: "SAVE_CURRENT_USER",
  payload: currentUser,
});

const failedToFetchCurrentUser = () => ({
  type: "FETCH_CURRENT_USER_FAILED",
  payload: 0,
});

const flushOutCurrentUser = () => ({
  type: "FLUSH_OUT_CURRENT_USER",
});

const signIn = (token) => {
  return async (dispatch, getState, Api) => {
    try {
      const response = await Api.SignIn(token);
      return dispatch(saveCurrentUser(response.user));
    } catch (err) {
      console.log("failure", { err });
      return dispatch(failedToFetchCurrentUser());
    }
  }
};

const signOut = () => {
  return flushOutCurrentUser();
}

export {
  signIn,
  signOut,
}
