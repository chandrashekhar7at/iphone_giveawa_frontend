import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullname: 'asd',
  instaId: '',
  email: '',
  phone: '',
  boxno: '',
  randomno:''
};

export const userInfo = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    setfullname: (state, action) => {
      state.fullname = action.payload;
    },
    setinstaId: (state, action) => {
      state.instaId = action.payload;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    setphone: (state, action) => {
      state.phone = action.payload;
    },
    setBoxNo:(state,action)=>{
      state.boxno = action.payload
    },
    setRandomNum:(state,action)=>{
      state.randomno = action.payload
    }
  },
});

export const { setRandomNum,setfullname, setinstaId, setemail, setphone, setBoxNo } = userInfo.actions;

export default userInfo.reducer;
