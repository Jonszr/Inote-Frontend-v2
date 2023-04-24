import {createSlice} from "@reduxjs/toolkit"
const token = localStorage.getItem('token');
const currUser = JSON.parse(localStorage.getItem('currUser'));
const expirationTime =localStorage.getItem('expirationTime')
const userSlice = createSlice(
    {
        name:'userInfo',
        initialState: ()=>{
            if(!token){
                return{
                    isLogin:false,
                    token:null,
                    currUser:null,
                    expirationTime:0
                }
            }

            return {
                isLogin:true,
                token,
                currUser,
                expirationTime
            }

        },
        reducers:{
            login(state,action){
                // console.log(action.payload.user);
                state.currUser = action.payload.user;
                state.token = action.payload.token;
                state.isLogin = true;
                
                console.log(action.payload.exp)
                localStorage.setItem('currUser',JSON.stringify(action.payload.user));
                localStorage.setItem('token',action.payload.token)
                if(action.payload.exp){
                    state.expirationTime = action.payload.exp;
                    localStorage.setItem('expirationTime', action.payload.exp)
                }
                
                console.log('login successfully')
                
            },
            logout(state,action){
                state.isLogin=false
                state.expirationTime = 0;
                state.currUser = null;
                state.token = null;


                localStorage.removeItem('currUser',state.currUser);
                localStorage.removeItem('token',state.token);
                localStorage.removeItem('expirationTime', state.expirationTime);

                console.log('logout successfully')
            },
            
            setUser(state,action){
               state.currUser = action.payload.user;
               localStorage.setItem('currUser',JSON.stringify(action.payload.user));
               console.log("set user") 
            },
            
            
        }
    }
)
export default userSlice;
export const {setUser,login,logout} = userSlice.actions;