import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend socket server URL

const ChatFloatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // To store incoming messages
  const [firstUserId, setFirstUserId] = useState(null); // To track the first user

  const userId = 'User1'; // Example user identifier, you can change this dynamically

  useEffect(() => {
    // Register the user when the component mounts
    socket.emit('register', userId);

    // Listen for incoming messages
    socket.on('receive_message', (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    // Set the first user ID when the component mounts
    if (!firstUserId) {
      setFirstUserId(userId);
    }
  }, [firstUserId, userId]);

  const handleSend = () => {
    if (message.trim()) {
      const formattedMessage = `${userId}: ${message}`; // Prepend user identifier
      console.log('Sending message:', formattedMessage);
      socket.emit('send_message', formattedMessage); // Emit the message to the server
      setMessage('');
    }
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };

  const chatBoxStyle = {
    position: 'fixed',
    bottom: '80px',
    left: '20px',
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    padding: '15px',
    zIndex: 1000,
  };

  const textareaStyle = {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333', // Darker text color for input
    backgroundColor: '#f9f9f9', // Light background for contrast
  };

  const sendButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const messageStyle = (sender) => ({
    color: '#000', // Set to black for maximum darkness
    margin: '5px 0', // Add some margin for spacing
    textAlign: sender === firstUserId ? 'left' : 'right', // Align based on sender
  });

  return (
    <div>
      {isOpen && (
        <div style={chatBoxStyle}>
          <textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
            aria-label="Chat message"
          />
          <button onClick={handleSend} style={sendButtonStyle}>
            Send
          </button>
          <div>
            {messages.map((msg, index) => {
              const [sender, text] = msg.split(': '); // Split the message into sender and text
              return (
                <div key={index} style={messageStyle(sender)}>
                  <strong>{sender}:</strong> {text} {/* Display incoming messages with dark text */}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        💬
      </button>
    </div>
  );
};

export default ChatFloatButton;