import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const AlContext = createContext();
const FunctionAlContext = ({ children }) => {
  //
  const URL = "http://localhost:5000/api/admin/";
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  // from user
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  return (
    <AlContext.Provider value={{ admin, setAdmin, URL }}>
      {children}
    </AlContext.Provider>
  );
};

const UseGlobelContext = () => {
  return useContext(AlContext);
};

export { FunctionAlContext, UseGlobelContext };
