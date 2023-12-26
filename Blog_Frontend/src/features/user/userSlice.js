import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserData: (state) => {
            localStorage.setItem("user", JSON.stringify(state.userData));
        },
        LOGIN_START: (state) => {
            state.userData = null
            state.isFetching = true
            state.error = false
        },
        LOGIN_SUCCESS : (state,action) =>{
            state.userData = action.payload
            state.isFetching=false
            state.error=false
        },
        LOGIN_FAILURE : (state)=>{
            state.userData = null
            state.isFetching=false
            state.error=true
        },
        UPDATE_START:(state)=>{
            state.isFetching = true
        },
        UPDATE_SUCCESS:(state,action)=>{
            state.userData = action.payload
            state.isFetching=false
            state.error=true
        },
        UPDATE_FAILURE :(state)=>{
            state.isFetching = false;
            state.error = true
        },
        LOGOUT: (state) => {
            state.userData = null;
            localStorage.setItem("user", JSON.stringify(state.userData));
            state.isFetching = false;
            state.error = false;
        }

    },

});

export const { loadUserData, LOGOUT,LOGIN_FAILURE,LOGIN_START,LOGIN_SUCCESS,UPDATE_FAILURE,UPDATE_START,UPDATE_SUCCESS } = userSlice.actions;

export default userSlice.reducer;
