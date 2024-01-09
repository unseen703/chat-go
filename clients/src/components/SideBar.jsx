import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, validUser } from '../apis/auth';
import { setActiveUser } from '../redux/activeUserSlice';
import { RiNotificationBadgeFill } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { BiNotification } from 'react-icons/bi';
import { setShowNotifications, setShowProfile } from '../redux/profileSlice';
// import Chat from './Chat';
import { acessCreate, fetchAllChats } from '../apis/chat.js';

import {
  fetchChats,
  setNotifications,
  setActiveChat,
} from '../redux/chatsSlice';
import { getSender } from '../utils/logics';
// import {  } from '../redux/chatsSlice'
import Group from '../components/Group';
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

// Augment the palette to include a violet color

// Update the Button's color options to include a violet option
const GreyMain = '#f0f0f0';
const WhiteMain = '#ffffff';
const LightBlueMain = "#dce8ff";
const BlueMain = "#4399ff";

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
    lightblue: {
        main: LightBlueMain,
        light:alpha(LightBlueMain, 0.5),
        dark: alpha(LightBlueMain, 0.9),
        // contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    blue: {
        main: BlueMain,
        light:alpha(BlueMain, 0.5),
        dark: alpha(BlueMain, 0.9),
    }
  },
});
const SideBar = () => {
  const dispatch = useDispatch();
  // const { personalchat } = useSelector((state) => state.personalchat);
  // const { groupchat } = useSelector((state) => state.groupchat);
  const { showProfile, showNotifications } = useSelector(
    (state) => state.profile
  );
  const [showPersonalChat, SetShowPersonalChat] = useState(1);
  // const personalchat = [];
  // const groupchat = [];
  const { notifications, personalchat, groupchat, activeChat } = useSelector(
    (state) => state.chats
  );
  const { activeUser } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [curList, setCurList] = useState([]);

  // const dispatch = useDispatch();

  // const activeUser = useSelector((state) => state.activeUser)

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
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="chat-list-div w-[100vw] sm:w-[30vw]   md:flex md:flex-col h-[100vh]  bg-[#f0f0f0] relative">
        <div className="h-[61px] px-4">
          <div className="flex items-center relative  -top-4 block h-[90px]">
            <h3 className="text-[20px] text-[#1f2228] font-body font-extrabold tracking-wider">
              {personalchat?.length + groupchat?.length > 1 ? 'Chats' : 'Chat'}
            </h3>
          </div>
          <div className="absolute top-4 right-5 flex items-center gap-x-3">
            <button
              onClick={() => dispatch(setShowNotifications(!showNotifications))}
            >
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
                style={{
                  width: '15px',
                  height: '15px',
                  fontSize: '9px',
                  padding: '4px 2px 2px 2px',
                }}
              />
              {showNotifications ? (
                <RiNotificationBadgeFill
                  style={{
                    width: '25px',
                    height: '25px',
                    color: '#000',
                  }}
                />
              ) : (
                <BiNotification
                  style={{
                    color: '#000',
                    width: '25px',
                    height: '25px',
                  }}
                />
              )}
            </button>
            <div
              className={`${
                showNotifications
                  ? 'overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl'
                  : 'hidden'
              }`}
            >
              <div className="text-[13px]">
                {!notifications.length && 'No new messages'}
              </div>
              {notifications.map((e, index) => {
                return (
                  <div
                    onClick={() => {
                      dispatch(setActiveChat(e.chatId));
                      dispatch(
                        setNotifications(
                          notifications.filter((data) => data !== e)
                        )
                      );
                    }}
                    key={index}
                    className="text-[12.5px] text-black px-2 cursor-pointer"
                  >
                    {e.chatId.isGroup
                      ? `New Message in ${e.chatId.chatName}`
                      : `New Message from ${getSender(
                          activeUser,
                          e.chatId.users
                        )}`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="-mt-6 relative pt-6 px-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                onChange={handleSearch}
                className="w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0"
                type="text"
                name="search"
                placeholder="Search"
              />
            </form>

            <div className="absolute top-[36px] left-[27px]">
              <BsSearch style={{ color: '#c4c4c5' }} />
            </div>
            <Group />

            <div
              style={{ display: search ? '' : 'none' }}
              className="h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4"
            >
              <Search
                searchResults={searchResults}
                isLoading={isLoading}
                handleClick={handleClick}
                search={search}
              />
            </div>
          </div>

          <Button
            variant="contained"
            
            color={showPersonalChat ? 'blue' : 'lightblue'}
            style={{ width: '50%' }}
            onClick={handlePersonal}
          >
            Personal
          </Button>
          <Button
            variant="contained"
         
            color={!showPersonalChat ? 'blue' : 'lightblue'}
            style={{ width: '50%' }}
            
            onClick={handleGroup}
          >
            Group
          </Button>

          {showPersonalChat ? (
            <ChatList list={personalchat} group={0} />
          ) : (
            <ChatList list={groupchat} group={1} />
          )}
          {/* <ChatList list={personalchat} group={0} />
                <ChatList list={groupchat} group={1} /> */}

          {/* <Contacts /> */}
          {/* <Contacts /> */}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SideBar;
