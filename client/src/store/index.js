import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mode: "dark",
  user: { first_name: null, last_name: null, friends: null },
  token: null,
  posts: [],
  POP_UP_STATE: "NOT_YET", // NOT_YET/OPEN/CLOSED
};
//STATE-SELECTORS.............
export const getMode = (state) => state.mode;
export const getUser = (state) => state.user;
export const getToken = (state) => state.token;
export const getPosts = (state) => state.posts;
export const getFriends = (state) => state.user.friends;
export const getPopUpState = (state) => state.POP_UP_STATE;
//STATE-SELECTORS.............
export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (action.payload.post._id === post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    openPopUp: (state, action) => {
      state.POP_UP_STATE = "OPEN";
    },
    closePopUp: (state) => {
      console.log("CLOSED...........inside-reduxx.........");
      state.POP_UP_STATE = "CLOSED";
    },
    defaultPopUp: (state) => {
      state.POP_UP_STATE = "NOT_YET";
    },
  },
});

export const {
  setPost,
  setPosts,
  setLogin,
  setLogout,
  setFriends,
  changeMode,
  openPopUp,
  closePopUp,
  defaultPopUp,
} = authSlice.actions;

export default authSlice.reducer;
