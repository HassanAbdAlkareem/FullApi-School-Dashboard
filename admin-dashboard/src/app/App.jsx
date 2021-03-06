import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UseGlobelContext } from "../context/FunctionAlContext";

import Login from "../pages/Login";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Interface from "../components/cmp-home/Interface";
import Teachers from "../components/cmp-home/Teachers";
import Students from "../components/cmp-home/Students";
import Materials from "../components/cmp-home/Materials";
import Governorates from "../components/cmp-home/Governorates";
import Region from "../components/cmp-home/Region";
import "./App.css";
import Products from "../components/cmp-home/Products";
import SectionProducts from "../components/cmp-home/SectionProducts";
import Cart from "../components/cmp-home/Cart";

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
              <Route exact path="/shop">
                <Cart />
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
              <Route path="/products/:id">
                <Products />
              </Route>
              <Route path="/add-section">
                <SectionProducts />
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
