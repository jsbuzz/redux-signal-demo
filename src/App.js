import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { DataFetcher } from "./components/DataFetcher";
import { SecondDataFetcher } from "./components/SecondDataFetcher";
import { ThirdDataFetcher } from "./components/ThirdDataFetcher";
import { DataFetcherWithTransitions } from "./components/DataFetcherWithTransitions";
import { FileUpload } from "./components/FileUpload";

function App() {
  const [showComponents, setShowComponents] = useState(true);
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <button onClick={() => setShowComponents(!showComponents)}>
            {showComponents ? "Hide Components" : "Show Components"}
          </button>
          {showComponents && <FileUpload />}
          {showComponents && <DataFetcherWithTransitions />}
          {showComponents && <SecondDataFetcher />}
          {showComponents && <DataFetcher />}
          {showComponents && <ThirdDataFetcher />}
        </header>
      </div>
    </Provider>
  );
}

export default App;
