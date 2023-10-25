import React from "react";
import { Link } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const { isConnected } = useChat();
  const { user } = useSelector((state) => state.user);
  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-col'>
        <p className='text-lg font-semibold'>{user.fullName}</p>
        <div className='text-xs flex items-center gap-1'>
          <p>{isConnected ? "Online" : "Offline"}</p>
          {isConnected ? (
            <p className='w-2 h-2 bg-green-500 rounded-full' />
          ) : (
            <p className='w-2 h-2 bg-red-500 rounded-full' />
          )}
        </div>
      </div>
      <Link className='cursor-pointer' to='/profile'>
        <img
          src={`https://api.multiavatar.com/${user.userName}.svg`}
          className='object-cover h-10 w-10 rounded-full'
          alt=''
        />
      </Link>
    </div>
  );
};

export default ProfileAvatar;
