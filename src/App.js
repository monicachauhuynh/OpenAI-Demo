import Prompt from "./Components/Prompt/index";
import "./App.css";
import Theme from "./Theme";

function App() {
  return (
    <Theme>
      <div className="App">
        <main className="main">
          <Prompt />
        </main>
      </div>
    </Theme>
  );
}

export default App;
