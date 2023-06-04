import React, { useEffect, useState } from "react";
// import io from 'socket.io-client';

const ReceiveMessagePage = () => {
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveMessagePage;
