import React from 'react';
import Chat from './Chat';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../components/SideBar';
const SmallChatDisplay = () => {
  const { activeChat } = useSelector((state) => state.chats);
//   useEffect(() => {
//     const div = document.getElementsByClassName('chat-page-div-small');
//     if (activeChat) {
//       div.classList.add('chat-page-visible');
//     } else {
//       div.classList.remove('chat-page-visible');
//       div.classList.add('chat-page-hide');
//     }
//   }, [activeChat]);

  return (
    <div>
      {activeChat ? (
        <div className="chat-container flex">
        <div className="chat-page-visible  chat-page-div  ">
          <Chat className="chat-page   relative  h-[100vh] bg-[#fafafa]" />
        </div>
        </div>
      ) : (
        <div className="chat-container flex">
        <SideBar />
        </div>
      )}
    </div>
  );
};

export default SmallChatDisplay;
