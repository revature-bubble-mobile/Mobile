import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import Profile from "./dtos/profile";


export interface User {
    /**User profile information. See {@link Profile} */
    profile: Profile
}


const initialState: User = {
    profile: {
        pid: "",
        firstName: "",
        lastName: "",
        passkey: "",
        email: "",
        username: "",
        following: [],
        followers: []
    }
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state: User, action: PayloadAction<Profile>) {
            state.profile = action.payload;
        }
    }
})

export const store = configureStore({
    reducer: slice.reducer
});

export const actions = slice.actions;