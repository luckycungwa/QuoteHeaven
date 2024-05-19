import "./App.css";
import Card from "./components/Card";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">

      <div className="logo-container">
        <img src="./images/logo.webp" className="logo" alt="Cover Logo" />
      </div>

      <Home />

      <div className="footer">
        <p className="credit-text">by Lucky Cungwa | All Rights Reserved  - &copy; 2024</p>
        <p className="credit-text"></p>
      </div>

    </div>
  );
}

export default App;
