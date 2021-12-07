import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UseGlobelContext } from "../context/FunctionAlContext";

import Login from "../pages/Login";
import Navbar from "../components/cmp-navbar/Navbar.jsx";
import Sidebar from "../components/cmp-sidebar/Sidebar";
import Interface from "../components/cmp-home/Interface";
import Teachers from "../components/cmp-home/Teachers";
import Students from "../components/cmp-home/Students";
import Materials from "../components/cmp-home/Materials";
import Governorates from "../components/cmp-home/Governorates";
import Region from "../components/cmp-home/Region";
import "./App.css";
import Products from "../components/cmp-home/Products";

function App() {
  const { admin } = UseGlobelContext();
  return (
    <Router>
      <div className="app">
        <Navbar />
        {admin ? (
          <div className="parent-flex">
            <Sidebar />
            <div className="home">
              <Route exact path="/">
                <Interface />
              </Route>
              <Route path="/teachers">
                <Teachers />
              </Route>
              <Route path="/students">
                <Students />
              </Route>
              <Route path="/materials">
                <Materials />
              </Route>
              <Route path="/governorates">
                <Governorates />
              </Route>
              <Route path="/regions">
                <Region />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
