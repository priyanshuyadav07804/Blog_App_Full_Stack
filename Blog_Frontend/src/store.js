import { configureStore } from '@reduxjs/toolkit';
import userReducer, { loadUserData } from './features/user/userSlice'

const store = configureStore({
    reducer : {
        user:userReducer
    }
})

store.dispatch(loadUserData())

export default store;