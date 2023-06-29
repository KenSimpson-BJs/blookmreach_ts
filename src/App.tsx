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
  };
  return (
    <div className="App pb-3">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}

      <BrPage
        configuration={{
          path: `${window.location.pathname}${window.location.search}`,
          endpoint:
            "https://test-bjs.bloomreach.io/delivery/site/v1/channels/prototypes/pages",
          httpClient: axios as any,
        }}
        mapping={mapping}
      ></BrPage>
    </div>
  );
}

export default App;
