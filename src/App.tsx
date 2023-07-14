// external
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrComponent, BrPage, BrPageContext } from "@bloomreach/react-sdk";

// internal
import {
  NewComponent,
  OpenHTML,
  CardComp,
  TileComp,
  BannerCTAComp,
  BannerGrid,
  Header,
  Footer,
} from "./components";

// styles
import logo from "./logo.svg";
import "./App.css";

function App() {
  const mapping = {
    NewComponent,
    OpenHTML,
    TileComp,
    CardComp,
    BannerCTAComp,
    BannerGrid,
    Header,
    Footer,
  };

  const [endp, setEndp] = useState(
    process.env.REACT_APP_P ?? window.sessionStorage.getItem("token")
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const temp: string = message;
    window.sessionStorage.setItem("token", temp);
    setEndp(temp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setMessage(event.target.value);
  };

  if (!endp || endp.length === 0) {
    return (
      <div className="App p-3">
        <form onSubmit={handleSubmit} className="mx-auto text-center">
          <input
            type="text"
            className="d-block mx-auto"
            onChange={handleChange}
          />
          <button className="d-block mt-3 px-3 py-1 mx-auto" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="App pb-3">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <BrPage
        configuration={{
          path: `${window.location.pathname}${window.location.search}`,
          endpoint: endp,
          httpClient: axios as any,
        }}
        mapping={mapping}
      >
        <BrComponent path="header">
          <div className="mr-3 mr-lg-0">
            <BrComponent />
          </div>
        </BrComponent>
        <BrComponent path="main">
          <div>
            <BrComponent />
          </div>
        </BrComponent>
        <BrComponent path="footer">
          <footer className="bg-secondary text-light py-3">
            {/* {!contextPage?.isPreview() && Boolean(cookieConsentVal) && (
              <BrPersonalization path={configuration.path} />
            )} */}
          </footer>
          <BrComponent />
        </BrComponent>
      </BrPage>
    </div>
  );
}

export default App;
