import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { getAllUsers } from "../../redux/actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/reducers/usersReducer";
import Loader from "../../layout/loading/Loader";
import { getAllChat } from "../../redux/actions/messageAction";

const UserList = () => {
  const { onlineUsers, setReceiver } = useChat();
  const [sortedUsers, setSortedUsers] = useState([]);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { users, loading, error } = useSelector((state) => state.users);
  const { allChat } = useSelector((state) => state.allChat);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllChat(user.userName));
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    setSortedUsers(
      users
        .filter((_user) => _user.userName !== user.userName)
        .sort((userA, userB) => {
          const lastMessageTimeA = getLastMessageTime(userA.userName);
          const lastMessageTimeB = getLastMessageTime(userB.userName);

          return new Date(lastMessageTimeB) - new Date(lastMessageTimeA);
        })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  function getLastMessageTime(userName) {
    const filteredChat = allChat.filter(
      (chat) => chat.receiver === userName || chat.sender === userName
    );

    if (filteredChat.length > 0) {
      return filteredChat[filteredChat.length - 1].createdAt;
    } else {
      // Return a default value if there are no messages
      return 0;
    }
  }

  return (
    <>
      <div className='h-[80vh] flex flex-col w-2/5 border-r-2 overflow-y-scroll'>
        {loading ? (
          <Loader height={"80vh"} />
        ) : sortedUsers?.length !== 0 ? (
          sortedUsers
            .filter((myuser) => myuser.userName !== user.userName)
            ?.map((user) => {
              const filteredChat = allChat.filter(
                (chat) =>
                  chat.receiver === user.userName ||
                  chat.sender === user.userName
              );
              return (
                <div
                  onClick={() => setReceiver(user.userName)}
                  key={user.userName}
                  className='flex flex-row gap-2 py-4 px-2 justify-center items-center border-b-2 hover:cursor-pointer'
                >
                  <div className='w-1/4'>
                    <img
                      src={`https://api.multiavatar.com/${user.userName}.svg`}
                      className='object-cover h-10 w-10 rounded-full'
                      alt=''
                    />
                    {onlineUsers.find(
                      (_user) => _user.userName === user.userName
                    ) ? (
                      <p className='w-1 h-1 bg-green-600 rounded-full' />
                    ) : null}
                  </div>
                  <div className='w-full'>
                    <div className='text-lg font-semibold'>{user.fullName}</div>
                    {
                      <span className='text-gray-500'>
                        {filteredChat.length !== 0
                          ? filteredChat[filteredChat.length - 1].message
                          : null}
                      </span>
                    }
                  </div>
                </div>
              );
            })
        ) : (
          <p className='py-4 flex justify-center'>Nobody is online</p>
        )}
      </div>
    </>
  );
};

export default UserList;
