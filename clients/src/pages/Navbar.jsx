// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import '../index.css'

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, validUser } from '../apis/auth.js';
import { setActiveUser } from '../redux/activeUserSlice.js';
import { RiNotificationBadgeFill } from 'react-icons/ri';

import { BiNotification } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { setShowNotifications, setShowProfile } from '../redux/profileSlice.js';
import { acessCreate } from '../apis/chat.js';
import './home.css';
import {
  fetchChats,
  setNotifications,
  setActiveChat,
} from '../redux/chatsSlice.js';
import { getSender } from '../utils/logics.js';

import { Effect } from 'react-notification-badge';
// import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
import NotificationBadge from 'react-notification-badge';
import Search from '../components/group/Search.jsx';
const Navbar = () => {
  const dispatch = useDispatch();
  const { showProfile, showNotifications } = useSelector(
    (state) => state.profile
  );
  const { notifications } = useSelector((state) => state.chats);
  const { activeUser } = useSelector((state) => state);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

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
    };
    isValid();
    // console.log(activeUser);
  }, [dispatch, activeUser]);

  return (
    <div>
      <div className="flex bg-[#4399ff]">
        <div className="md:flex md:flex-col w-[100vw] relative">
          {/* <div className="md:flex md:flex-col w-[100vw]   bg-[] rel#ffe7abative"> */}
          <div className="h-[61px] px-4">
            <div className="flex">
              <Link
                className="flex items-center relative  -top-4 block h-[90px]"
                to="/"
              >
                <h3 className="text-[20px] text-[#ffffff] font-body font-extrabold tracking-wider">
                  Chat-Go
                </h3>
              </Link>
            </div>
            <div className="absolute top-4 right-5 flex items-center gap-x-3">
              {activeUser.profilePic && (
                <button
                  onClick={() => dispatch(setShowProfile(true))}
                  className="flex items-center gap-x-1 relative"
                >
                  <img
                    className="w-[28px] h-[28px] rounded-[25px]"
                    src={activeUser?.profilePic}
                    alt=""
                  />
                  <IoIosArrowDown
                    style={{ color: '#616c76', height: '14px', width: '14px' }}
                  />
                </button>
              )}
            </div>
          </div>

          {/* <div>
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

              <Button onClick={handlePersonal}>Personal</Button>
              <Button onClick={handleGroup}>Group</Button>
           <Contacts />
                  <Contacts /> 
            </div> */}
        </div>
        {showProfile &&
        (
          <Profile className=" bg-[#f0f0f0]   right-0 shodow-xl fixed z-50 Profile" />
        )}
        {/* <Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]" /> */}
      </div>
    </div>
  );
};

export default Navbar;