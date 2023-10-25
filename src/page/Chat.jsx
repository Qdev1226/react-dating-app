/* eslint-disable react/prop-types */
import React from "react";
import ProfileAvatar from "../components/chatComponents/ProfileAvatar";
import UserList from "../components/chatComponents/UserList";
import ChatBox from "../components/chatComponents/ChatBox";
import AdBox from "../components/chatComponents/AdBox";
import Socket from "../socket";
// import NewVisitor from "../components/chatComponents/NewVisitor";

const Chat = () => {
  return (
    <>
      {/* <NewVisitor /> */}
      <Socket />
      <div className='min-h-[100vh] flex justify-center items-center'>
        <div className='shadow-lg rounded-lg'>
          {/* Header */}
          <div className='px-5 py-5 flex justify-between items-center bg-white border-b-2'>
            <div className='font-semibold text-2xl'>React Dating App</div>
            <ProfileAvatar />
          </div>
          <div className='flex flex-row justify-between bg-white'>
            <UserList />
            <ChatBox />
            <AdBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
