//use RTK to build store
import {configureStore} from "@reduxjs/toolkit"

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userApi from "./userApi";
import userSlice from "./userSlice";






const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{return getDefaultMiddleware({immutableCheck: false,
        serializableCheck: false,}).concat(userApi.middleware)}
})

setupListeners(store.dispatch);


export default store;