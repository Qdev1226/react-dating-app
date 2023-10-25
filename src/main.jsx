import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import axios from "axios";
import { ChatContextProvider } from "./context/ChatContext.jsx";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </Provider>
  </React.StrictMode>
);
