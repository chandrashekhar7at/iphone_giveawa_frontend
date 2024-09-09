import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:false,
  id:null,
  infoid:null,
  alertmessage:'',
  alertStatus:false,
  paymentStatus:false
}

export const userSlice = createSlice({
  name: 'userauth',
  initialState,
  reducers: {
    validUSer: (state,action) => {
      state.user = action.payload
    },
    userid:(state,action)=>{
        state.id = action.payload
    },
    infoid:(state,action)=>{
        state.infoid = action.payload
    },
    setAlert:(state,action)=>{
        state.alertmessage = action.payload
    },
    setAlertStatus:(state,action)=>{
        state.alertStatus = action.payload
    },
    setpaymentStatus:(state,action)=>{
        state.paymentStatus = action.payload
    }
  },
})

export const { setpaymentStatus,setAlertStatus,setAlert,validUSer,userid,infoid } = userSlice.actions

export default userSlice.reducer