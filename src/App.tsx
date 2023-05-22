// external
import React from "react";

// internal
import { NewComponent, Card } from "./components";

// styles
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <NewComponent
        title="Mein"
        cta="Kampf"
        link="https://www.google.com"
      ></NewComponent>
      <Card title="Card" cta="Component" link="https://www.yahoo.com"></Card>
    </div>
  );
}

export default App;
