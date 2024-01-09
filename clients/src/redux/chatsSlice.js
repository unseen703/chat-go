import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchAllChats } from '../apis/chat';
const initialState = {
  chats: [],
  smallDeviceChat:false,
  groupchat :[],
  personalchat:[],
  activeChat: '',
  isLoading: false,
  notifications: [],
};
export const fetchChats = createAsyncThunk('redux/chats', async () => {
  try {
    const data = await fetchAllChats();
    let group = [], personal=[];
    data.forEach(element => {
      if(element.isGroup)
      {
        group.push(element);
      }
      else{
        personal.push(element);
      }
    });

    return {chats:data, groupchat: group, personalchat: personal};
  } catch (error) {
    toast.error('Something Went Wrong!Try Again');
  }
});
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setActiveChat: (state, { payload }) => {
      state.activeChat = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
    setSmallDeviceChat: (state, { payload }) => {
      state.smallDeviceChat = payload;
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchChats.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      state.chats = payload.chats;
      state.personalchat = payload.personalchat;
      state.groupchat = payload.groupchat;
      
      state.isLoading = false;
    },
    [fetchChats.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setActiveChat, setNotifications,setSmallDeviceChat } = chatsSlice.actions;
export default chatsSlice.reducer;
