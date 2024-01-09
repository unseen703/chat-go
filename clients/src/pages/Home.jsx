import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, validUser } from '../apis/auth';
import activeUserSlice, { setActiveUser } from '../redux/activeUserSlice';
import { RiNotificationBadgeFill } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { BiNotification } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { setShowNotifications, setShowProfile } from '../redux/profileSlice';
import Chat from './Chat';
import Profile from '../components/Profile';
import { acessCreate, fetchAllChats } from '../apis/chat.js';
import SmallChatDisplay from './SmallChatDisplay.jsx';
import './home.css';
import {
  fetchChats,
  setNotifications,
  setActiveChat,
} from '../redux/chatsSlice';
import { getSender } from '../utils/logics';
// import {  } from '../redux/chatsSlice'
import Group from '../components/Group';
import Contacts from '../components/Contacts';
import { Effect } from 'react-notification-badge';
// import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
import NotificationBadge from 'react-notification-badge';
import Search from '../components/group/Search';
import ChatList from '../components/ChatList.jsx';
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import SideBar from '../components/SideBar.jsx';

// Augment the palette to include a violet color

// Update the Button's color options to include a violet option
const GreyMain = '#a3a3a3';
const WhiteMain = '#cfd0d1';
// const WhiteMain = "#e1e5eb";

const theme = createTheme({
  palette: {
    grey: {
      main: GreyMain,
      light: alpha(GreyMain, 0.5),
      dark: alpha(GreyMain, 0.9),
      // contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    white: {
      main: WhiteMain,
      light: alpha(WhiteMain, 0.5),
      dark: alpha(WhiteMain, 0.9),
      // contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

function Home() {
  const dispatch = useDispatch();
  
  const { showProfile, showNotifications } = useSelector(
    (state) => state.profile
  );
  const [showPersonalChat, SetShowPersonalChat] = useState(1);

  const { activeUser } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const history = useNavigate();
  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const handleClick = async (e) => {
    await acessCreate({ userId: e._id });
    dispatch(fetchChats());
    setSearch('');
  };

  const handleGroup = (e) => {
    SetShowPersonalChat(0);
  };
  const handlePersonal = (e) => {
    SetShowPersonalChat(1);
  };
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const { data } = await searchUsers(search);
      setSearchResults(data);
      setIsLoading(false);
    };
    searchChange();
  }, [search]);

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();

      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name: data?.user?.name,
      };
      dispatch(setActiveUser(user));
      fetchAllChats();
    };

    isValid();
  }, [dispatch, activeUser]);
  const [width, setWidth] = useState(window.innerWidth);
 const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      
        <div className="bg-[#282C35] scrollbar-hide z-10 h-[100vh] w-[100vw]  overflow-y-hidden shadow-2xl">
          
            {
              
            }
          { width < 650 ? (
            <SmallChatDisplay />
            
          ) : (
            <div className="chat-container flex  ">
            <SideBar />
            <div className='  chat-page-div w-[100vw] sm:w-[70vw] right-[3%]'>
              <Chat className="chat-page  w-[100vw] sm:w-[70vw]   relative  h-[100vh] bg-[#fafafa]" />
            </div>
        </div>
          )}
          </div>
    </>
  );
}

export default Home;
