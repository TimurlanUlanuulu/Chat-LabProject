import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../components/Profile/actions/profileReducer";
// import columnReducer from "../store/columnSlice"

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
