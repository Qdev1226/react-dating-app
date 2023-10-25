import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useChat } from './context/ChatContext';

const URL = import.meta.env.VITE_BASE_URL

export const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3
});

const Socket = () => {
    const { setIsConnected, setMessages, setOnlineUsers } = useChat()
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        socket.connect();
        console.log("socket connected");
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        };
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log("connect event");
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [setIsConnected]);

    useEffect(() => {
        socket.emit("new-online-user", user.userName, (error) => {
            if (error) {
                return alert(error);
            }
        });

        socket.on("get-online-users", (users) => {
            console.log(users);
            setOnlineUsers(users.filter((user0) => user0.userName !== user.userName));
        });

        socket.on("send-message", (sender, message, createdAt) => {
            setMessages((previous) => [
                ...previous,
                { sender, receiver: user.userName, message, createdAt },
            ]);
            console.log(sender, message);
        });

        return () => {
            socket.off("get-online-users");
            socket.off("send-message");
            socket.off("new-online-user");
        };
    }, [user, setMessages, setOnlineUsers]);
}

export default Socket