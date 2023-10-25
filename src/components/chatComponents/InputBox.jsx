import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { BsSendFill } from "react-icons/bs";
import { newMessage } from "../../redux/actions/messageAction";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const { receiver, setMessages } = useChat();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const sendMessage = () => {
    if (!receiver) {
      return alert("Please select a user to start chating");
    }

    dispatch(newMessage({ sender: user.userName, receiver, message }));

    setMessages((previous) => [
      ...previous,
      {
        sender: user.userName,
        receiver,
        message,
        createdAt: new Date(Date.now()),
      },
    ]);
    socket.emit(
      "send-message",
      user.userName,
      receiver,
      message,
      new Date(Date.now()),
      () => {
        setMessage("");
      }
    );
  };

  return (
    <div className='flex py-5'>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className='w-full bg-gray-300 py-5 px-3 rounded-tl-xl rounded-bl-xl outline-none'
        type='text'
        placeholder='type your message here...'
        onKeyDown={(event) =>
          event.key === "Enter" && message.trim() ? sendMessage(message) : null
        }
      />
      <button
        className='px-4 bg-gray-300 rounded-tr-xl rounded-br-xl'
        onClick={message.trim() ? sendMessage : null}
      >
        <BsSendFill size={22} />
      </button>
    </div>
  );
};

export default InputBox;
