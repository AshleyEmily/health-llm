import React, { useState } from 'react';

function MessageSender() {
  const [message, setMessage] = useState(''); // State to hold the user's message
  const [response, setResponse] = useState(''); // State to hold the response from Flask

  // Handle input changes
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission to send a message to the Flask API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to the Flask API
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Send the message as JSON
      });

      // Handle the response from Flask
      const data = await res.json();
      setResponse(data.response); // Update the state with the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Send a Message to Flask API</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter a message"
        />
        <button type="submit">Send Message</button>
      </form>

      {response && (
        <div>
          <h3>Flask Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default MessageSender;
