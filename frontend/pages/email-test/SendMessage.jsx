import React, { useEffect, useState } from 'react';

const MessagePage = () => {
  const [tempMessages, setTempMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [intervalTime, setIntervalTime] = useState(2000); // Initial interval time

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [intervalTime]);

  useEffect(() => {
    if (tempMessages.length > 0) {
      setMessages(tempMessages);
      setTempMessages([]);
    }
  }, [tempMessages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/messages');
      const data = await response.json();
      setTempMessages(data);
      setIntervalTime(1000); // Reset interval time to 1 second if successful fetch
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      increaseInterval(); // Increase interval time if fetch fails
    }
  };

  const increaseInterval = () => {
    setIntervalTime(intervalTime + 1000); // Increase interval time by 1 second
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      sender_id: 1,
      receiver_id: 2,
      content: newMessage,
    };

    try {
      await fetch('http://127.0.0.1:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Sender ID</th>
            <th>Receiver ID</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.sender_id}</td>
              <td>{message.receiver_id}</td>
              <td>{message.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagePage;
