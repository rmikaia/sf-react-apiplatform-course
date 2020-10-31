import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CurstomersPage";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/InvoicesPage";

const App = () => (
  <HashRouter>
    <Navbar />
    <main className="container pt-5">
      <Switch>
        <Route path="/invoices" component={InvoicesPage}></Route>
        <Route path="/customers" component={CustomersPage}></Route>
        <Route path="/" component={HomePage}></Route>
      </Switch>
    </main>
  </HashRouter>
);

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
