import React from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";

const SelectedUser = () => {
  const { onlineUsers, receiver } = useChat();

  const { users } = useSelector((state) => state.users);

  return (
    <div className='w-full flex flex-col'>
      {users?.find((user) => user.userName === receiver) && receiver && (
        <div className='px-5 py-2 flex items-center gap-2 border-b-2'>
          <img
            src={`https://api.multiavatar.com/${receiver}.svg`}
            className='object-cover h-10 w-10 rounded-full'
            alt=''
          />
          <div className='text-lg font-semibold'>
            <p>
              {users.filter((user) => user.userName === receiver)[0]?.fullName}
            </p>
            <div className='text-xs flex items-center gap-1'>
              <p>
                {onlineUsers.find((user) => user.userName === receiver)
                  ? "Online"
                  : "Offline"}
              </p>
              {onlineUsers.find((user) => user.userName === receiver) ? (
                <p className='w-2 h-2 bg-green-500 rounded-full' />
              ) : (
                <p className='w-2 h-2 bg-red-500 rounded-full' />
              )}
            </div>
          </div>
        </div>
      )}
      {/* <!-- message --> */}
    </div>
  );
};

export default SelectedUser;
