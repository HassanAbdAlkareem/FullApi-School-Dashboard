import React from "react";
import {
  AiFillHome,
  GiTeacher,
  IoSchoolSharp,
  SiSololearn,
  IoLogOutSharp,
  FaSearch,
  IoLocation,
  FaShoppingCart,
} from "react-icons/all";
import { Link } from "react-router-dom";
import { UseGlobelContext } from "../../context/FunctionAlContext";

const Sidebar = () => {
  const { setAdmin } = UseGlobelContext();
  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="home-sidebar">
          <Link to="/">
            <AiFillHome className="icon" />
            الرئيسية
          </Link>
        </div>
        <div className="teachers">
          <Link to="teachers">
            <GiTeacher className="icon" />
            الاساتذة
          </Link>
        </div>
        <div className="students">
          <Link to="students">
            <IoSchoolSharp className="icon" />
            الطلاب
          </Link>
        </div>
        <div className="materials">
          <Link to="materials">
            <SiSololearn className="icon" />
            التدريسة
          </Link>
        </div>
        <div className="governorates">
          <Link to="governorates">
            <FaSearch className="icon" />
            محافضات
          </Link>
        </div>
        <div className="regions">
          <Link to="regions">
            <IoLocation className="icon" />
            المناطق
          </Link>
        </div>
        <div className="products">
          <Link to="products">
            <FaShoppingCart className="icon" />
            المنتجات
          </Link>
        </div>
        <div className="logout" onClick={() => setAdmin(null)}>
          <Link to="/">
            <IoLogOutSharp className="icon" />
            الخروج
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
