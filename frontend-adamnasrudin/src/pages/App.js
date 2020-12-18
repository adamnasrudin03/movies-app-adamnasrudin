import React from "react";
import { Routes, Store } from "../configs";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
}

export default App;
