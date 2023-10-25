import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import InputBox from "./InputBox";
import SelectedUser from "./SelectedUser";
import Loader from "../../layout/loading/Loader";
import { getTime } from "../../utils/time";

const ChatBox = () => {
  const chatBoxRef = useRef();

  const { receiver, messages } = useChat();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.messages);

  const scrollToBottom = () => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight, // Scroll to the bottom of the page
        behavior: "smooth", // Use smooth scrolling animation
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className='w-full flex flex-col'>
        <SelectedUser />
        {users?.find((user) => user.userName === receiver) && receiver ? (
          <div className='w-full h-full px-5 flex flex-col justify-between'>
            <div
              ref={chatBoxRef}
              className='h-[55vh] flex flex-col mt-5 overflow-y-scroll'
            >
              {loading ? (
                <Loader height={"50vh"} />
              ) : messages.length !== 0 ? (
                <Messages messages={messages} user={user} />
              ) : (
                <p className='text-xl h-full flex justify-center items-center'>
                  No Chat history
                </p>
              )}
            </div>
            <InputBox />
          </div>
        ) : (
          <p className='h-full text-xl flex justify-center items-center'>
            👈 Select a user to start chatting.
          </p>
        )}
      </div>
    </>
  );
};

export default ChatBox;

const Messages = ({ messages, user }) => {
  let prevDate = null;

  return messages.map((message, i) => {
    const formattedTime = getTime(message.createdAt);

    const dateString = message.createdAt;
    const date = new Date(dateString);

    // Get the current date and yesterday's date
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    // Check if the date is today, yesterday, or a different day
    let humanReadableDate;

    if (date.toDateString() === currentDate.toDateString()) {
      humanReadableDate = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      humanReadableDate = "Yesterday";
    } else {
      // Options for formatting the date
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      // Convert the date to a human-readable string
      humanReadableDate = date.toLocaleDateString("en-US", options);
    }

    // Check if the current message's date is different from the previous one
    const showDateSeparator = humanReadableDate !== prevDate;

    // Update the previous date
    prevDate = humanReadableDate;

    return message.sender === user.userName ? (
      <>
        {showDateSeparator && (
          <div className='m-auto'>
            <p className='w-fit text-center text-sm rounded-xl px-5 bg-gray-200'>
              {humanReadableDate}
            </p>
          </div>
        )}
        <div key={i} className='flex justify-end mb-4'>
          <div>
            <div className='mr-3 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
              {message.message}
            </div>
            <p className='text-sm text-right mr-3'>{formattedTime}</p>
          </div>
        </div>
      </>
    ) : (
      <>
        {showDateSeparator && (
          <div className='m-auto'>
            <p className='w-fit text-center text-sm rounded-xl px-5 bg-gray-200'>
              {humanReadableDate}
            </p>
          </div>
        )}
        <div key={i} className='flex justify-start mb-4'>
          <div>
            <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
              {message.message}
            </div>
            <p className='text-sm ml-2'>{formattedTime}</p>
          </div>
        </div>
      </>
    );
  });
};