import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as signalR from "@aspnet/signalr";
import { DOMAIN } from "./util/SystemSetting/SystemSetting";
import "./i18n";
const root = ReactDOM.createRoot(document.getElementById("root"));
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

// connection
//   .start()
//   .then(() => {
//     root.render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
