import { useEffect, useRef, useState } from "react";

// input & ref. button. onclick.

const App = () => {
  // gets the reference of the input element
  const inputRef = useRef<HTMLInputElement>(null);
  // this is just used to use the socket globally
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // the stores the response by the server
  const [response, setResponse] = useState<string>();

  async function sendMessage() {
    // this should be present inside the sendMessage function so that it's value is updated as values are input in the box
    const message = inputRef.current?.value;
    if (!socket) {
      return;
    }

    if (message) {
      socket.send(message);
    }
  }

  // when the app first loads, it should make a websocket connection and everytime there is a message, it should set the response accordingly
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (e) => {
      setResponse(e.data);
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="message..." ref={inputRef} />
      <button onClick={sendMessage}>Submit</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default App;
