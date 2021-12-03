import React from "react";
import { MdAdminPanelSettings } from "react-icons/all";

const Navbar = () => {
  return (
    <div className="navbarr">
      <div className="logo">
        <MdAdminPanelSettings className="icon" />
        <h2>لوحة التحكم</h2>
      </div>
    </div>
  );
};

export default Navbar;
