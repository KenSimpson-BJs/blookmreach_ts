// external
import React from "react";
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

const kenTestToken = "d393d9a9-caac-4b3b-b173-014c36b250d7";

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
  return (
    <div className="App pb-3">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <BrPage
        configuration={{
          path: `${window.location.pathname}${window.location.search}`,
          endpoint:
            "https://test-bjs.bloomreach.io/delivery/site/v1/channels/qa3---core/pages",
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
