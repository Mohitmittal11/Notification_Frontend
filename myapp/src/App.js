import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import { createContext, useState } from "react";

export const Context = createContext();

function App() {
  const [messagevalue, setMessageValue] = useState();
  return (
    <div className="App">
      <Context.Provider value={{messagevalue, setMessageValue}}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
