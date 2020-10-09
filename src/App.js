import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { DataFetcher } from "./components/DataFetcher";
import { SecondDataFetcher } from "./components/SecondDataFetcher";

function App() {
  const [showFetchers, setShowFetchers] = useState(true);
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <button onClick={() => setShowFetchers(!showFetchers)}>
            {showFetchers ? "Hide fetchers" : "Show fetchers"}
          </button>
          {showFetchers && <DataFetcher />}
          {showFetchers && <SecondDataFetcher />}
        </header>
      </div>
    </Provider>
  );
}

export default App;
