import { configureStore } from "@reduxjs/toolkit";
import  UserSlice  from "./Feature/UserSlice";

const store = configureStore({
  reducer: {
    UserSignIn: UserSlice,
  },
  devTools: true,// Redux DevTools Extension ko enable karne ke liye
});
export default store;
