import Prompt from "./Components/Prompt/index";
import Header from "./Components/Header/index";
import Landing from "./Components/Landing/index";
import "./App.css";
import Theme from "./Theme";

function App() {
  return (
      <Theme>
        <div className="App">
          <div className="header">
            <Header />
          </div>
          <main className="main">
              <Landing />
              <Prompt />
          </main>
        </div>
      </Theme>
  );
}

export default App;
