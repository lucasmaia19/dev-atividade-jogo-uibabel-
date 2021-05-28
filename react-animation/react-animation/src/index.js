import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Example } from "./Example";
import Example2 from "./Example2";
import atividade from "./Atividade";
import Example3 from "./Atividade";
import Example4 from "./Example4";
import Atividade from "./Atividade";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/* <Example /> */}
    {/* <Example2 /> */}
    <Atividade />
    {/* <Example4 /> */}
    {/* <App /> */}
  </React.StrictMode>,
  rootElement
);
