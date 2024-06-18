import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "", 
    email: "",
    isLoggedIn : false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
