import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/Userinfo/userinfo.css";
import { io } from "socket.io-client";
const Userinfo = () => {
  const [userform, setUserForm] = useState();
  const [socket, setSocket] = useState();

  // useEffect(() => {
  // //   if (socket) {
  // //     socket?.on("message", (msg) => {
  // //       console.log("Message  Received from server is ", msg);
  // //     });
  // //     console.log(socket, "Socket is");
  // //   }
  // }, []);

  useEffect(() => {
    setSocket(io("http://localhost:8001/"));
  }, []);

  const handleChange = (e) => {
    setUserForm({ ...userform, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const socket = io("http://localhost:8001/");
    if (socket) {
      socket?.emit("message", "Hello");

      console.log("Socket is ", socket);

      // setSocket1(socket);
    }
    if (socket) {
      socket?.on("message", (msg) => {
        console.log("Message  Received from server is ", msg);
      });
      console.log(socket, "Socket is");
    }

    if (userform) {
      console.log("User form is", userform);
      const result = await axios.post("http://localhost:8001/submitUserData", {
        data: userform,
      });

      //   //   console.log("Result is", result);
      //   if (result.status === 200) {
      //     setSocket1(result.data.socket);
      //   }
    }
  };

  //   if (socket1) {
  //     console.log("Socket 1 is", socket1);
  //   }
  return (
    <div className="usermain-container">
      <div className="form-data">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            placeholder="enter your name"
            onChange={handleChange}
          />
          <input
            className="input"
            type="email"
            name="email"
            id="maildata"
            placeholder="enter your email"
            onChange={handleChange}
          />
          <div className="leaveApproved">
            <div className="isapproved">
              <input
                className="radio"
                type="radio"
                value={"Approved"}
                name="isleaveApproved"
                id="approve"
                onChange={handleChange}
              />
              <label className="leavelabel" htmlFor="leave">
                {" "}
                Approved
              </label>
            </div>
            <div className="isapproved">
              <input
                className="radio"
                type="radio"
                name="isleaveApproved"
                id="notapprove"
                value={"Not Approved"}
                onChange={handleChange}
              />
              <label className="leavelabel" htmlFor="notapprove">
                Not Approved
              </label>
            </div>
          </div>
          <button id="userinfobtn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Userinfo;
