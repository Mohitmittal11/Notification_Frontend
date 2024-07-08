import { React, useEffect, useState } from "react";
import "../Style/Client/client.css";
import { useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Context } from "../App";
const Client = () => {
  const { setMessageValue } = useContext(Context);

  const [userMessage, setUserMessage] = useState();
  const [serverMessageArray, setServerMessagearray] = useState();
  // const [arraydata, setArrayData] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      const result = await axios.get("http://localhost:8001/getServerData");
      if (result) {
        console.log("Data receive from Server is", result.data.data);
        setServerMessagearray(result.data.data);
        setMessageValue(result.data.data);
      }
    }
    fetchdata();

    setSocket(io("http://localhost:8001"));
  }, []);

  // useEffect(() => {
  //   async function fetchdata() {
  //     const result = await axios.get("http://localhost:8001/getServerData");
  //     if (result) {
  //       console.log("Data receive from Server is", result.data.serverMessage);
  //       setArrayData(result.data.serverMessage);
  //     }
  //   }
  //   fetchdata();
  // },[serverMessage]);

  useEffect(() => {
    socket?.on("message", (msg) => {
      console.log("Message is", msg);
    });
  }, [socket]);

  const handleClick = async (e) => {
    e.preventDefault();

    socket?.emit("message", userMessage);

    const response = await axios.post(
      "http://localhost:8001/addusermessagedata",
      {
        message: userMessage,
      }
    );
    if (response.status === 200) {
      console.log("response from server is", response);
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>Client Page</h1>

      <div className="forvalue">
        <form>
          <input
            type="text"
            name="message"
            id="description"
            placeholder="Enter some data"
            onChange={(e) => {
              setUserMessage({ ...userMessage, message: e.target.value });
            }}
          />
          <button onClick={handleClick} id="submitDatabtn">
            Submit
          </button>
        </form>
        {serverMessageArray &&
          serverMessageArray?.map((value, i) => (
            <p key={i}>{value?.message}</p>
          ))}
      </div>
    </div>
  );
};

export default Client;
