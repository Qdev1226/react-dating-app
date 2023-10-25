import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTwoMessages } from "../redux/actions/messageAction";
import { clearErrors } from "../redux/reducers/twoMessagesReducer";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [receiver, setReceiver] = useState();

  const { user } = useSelector((state) => state.user);
  const { messages: twoMessages, error } = useSelector(
    (state) => state.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (receiver) {
      dispatch(getTwoMessages({ sender: user.userName, receiver }));
    }
  }, [receiver, dispatch, user]);

  useEffect(() => {
    setMessages(twoMessages);
  }, [twoMessages]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      <ChatContext.Provider
        value={{
          messages,
          setMessages,
          onlineUsers,
          setOnlineUsers,
          isConnected,
          setIsConnected,
          receiver,
          setReceiver,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => useContext(ChatContext);
