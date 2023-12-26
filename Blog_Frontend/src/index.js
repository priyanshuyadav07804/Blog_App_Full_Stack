import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ContextProvider } from "./context/Context";
import { Provider } from "react-redux";
import  store  from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
    </Provider>
    
  </React.StrictMode>
);
