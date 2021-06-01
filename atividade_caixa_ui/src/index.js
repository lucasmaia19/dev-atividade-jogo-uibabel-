import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'regenerator-runtime/runtime'

import "./index.css";
import App from "./App";
import MenuBar from "./menu-bar/menu-bar";
import AtividadeMontar from './atividade-montar/atividade-montar';
import AtividadeJogo from './atividade-jogo/atividade-jogo';
import ListagemAnimation from "./listagem-animation/listagem-animation";

import ExampleCountFunction from "./example/example-count-function";
import ExampleCountClass from "./example/example-count-class";
import ExampleHttpFunction from "./example/example-http-function";
import ExampleHttpClass from "./example/example-http-class";


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter> 
			<Switch>
				<Route exact path="/" component={AtividadeJogo} />
				<Route exact path="/appJs" component={App} />
				<Route exact path="/menuBar" component={MenuBar}/>

				<Route exact path="/example-count-function" component={ExampleCountFunction}/>
				<Route exact path="/example-count-class" component={ExampleCountClass}/>

				<Route exact path="/example-http-function" component={ExampleHttpFunction}/>
				<Route exact path="/example-http-class" component={ExampleHttpClass}/>

				<Route exact path="/teste-animation" component={ListagemAnimation}/>
				<Route exact path="/listagem-animation" component={ListagemAnimation}/>

				<Route exact path="/atividade-montar" component={AtividadeMontar}/>
				<Route exact path="/atividade-montar/:id" component={AtividadeMontar}/>
			</Switch>
		</BrowserRouter>,
	</React.StrictMode>,
  document.getElementById("root")
);
