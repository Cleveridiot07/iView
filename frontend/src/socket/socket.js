// src/socket/socket.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Replace with your server URL

// Function to establish a socket connection for a specific interview
export const connectToInterview = (interviewID) => {
    // Connect to the server with the interviewID as a query parameter
    const socket = io(SOCKET_SERVER_URL, {
        query: { interviewID }
    });

    // Function to register a user
    const registerUser = (username) => {
        socket.emit('register', username);
    };

    // Function to send a private message
    const sendPrivateMessage = (recipient, message) => {
        socket.emit('private_message', { recipient, message });
    };

    // Function to handle receiving a private message
    const onPrivateMessage = (callback) => {
        socket.on('private_message', (data) => {
            callback(data);
        });
    };

    // Function to disconnect socket
    const disconnectSocket = () => {
        if (socket) socket.disconnect();
    };

    return {
        socket,
        registerUser,
        sendPrivateMessage,
        onPrivateMessage,
        disconnectSocket,
    };
};
