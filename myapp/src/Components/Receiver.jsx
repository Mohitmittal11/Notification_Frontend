import React, { useEffect } from "react";
import { useContext } from "react";

import { Context } from "../App";
const Receiver = () => {
  const { messagevalue } = useContext(Context);

  useEffect(() => {
    if (messagevalue) {
      console.log("Message value", messagevalue);
    }
  }, [messagevalue]);

  return (
    <div>
      <h1>I am Receiver For Getting Message</h1>

      <h2>{messagevalue}</h2>
    </div>
  );
};

export default Receiver;
