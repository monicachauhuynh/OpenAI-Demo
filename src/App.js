import React, { useState } from "react";
import Prompt from "./Components/Prompt/index";
import Header from "./Components/Header/index";
import Landing from "./Components/Landing/index";
import "./App.css";
import Theme from "./Theme";

function App() {
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (isClick) => {
    setIsScroll(isClick);
  }
  return (
    <Theme>
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <main className="main">
          <Landing handleScroll={handleScroll} />
          <Prompt scroll={isScroll} />
        </main>
      </div>
    </Theme>
  );
}

export default App;
