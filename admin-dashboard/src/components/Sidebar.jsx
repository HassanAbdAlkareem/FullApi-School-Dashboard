import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiFillHome,
  GiTeacher,
  IoSchoolSharp,
  SiSololearn,
  IoLogOutSharp,
  FaSearch,
  IoLocation,
  IoIosArrowDropdownCircle,
  BsFillPlusCircleFill,
  HiShoppingBag,
} from "react-icons/all";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { UseGlobelContext } from "../context/FunctionAlContext";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires-products/"
        );
        setDropdown(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [path]);

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
        <div className="products-side">
          <div className="title" onClick={() => setOpenDropDown(!openDropDown)}>
            <IoIosArrowDropdownCircle className="icon" />
            الملازم
          </div>

          <div className={openDropDown ? "dropdown" : "dropdown dont-show"}>
            {dropdown.map((product) => (
              <Link to={"/products/" + product._id}>
                <div className="product">{product.nameProduct}</div>
              </Link>
            ))}
            <Link to="/add-section" className="title-add-section">
              <div className="for-flex">
                <BsFillPlusCircleFill className="icon" />
                كُل الأقسام
              </div>
            </Link>
          </div>
        </div>
        <div className="shop">
          <Link to="/shop">
            <HiShoppingBag className="icon" />
            التسوق
          </Link>
        </div>
        <div className="teachers">
          <Link to="/teachers">
            <GiTeacher className="icon" />
            الاساتذة
          </Link>
        </div>
        <div className="students">
          <Link to="/students">
            <IoSchoolSharp className="icon" />
            الطلاب
          </Link>
        </div>
        <div className="materials">
          <Link to="/materials">
            <SiSololearn className="icon" />
            التدريسة
          </Link>
        </div>
        <div className="governorates">
          <Link to="/governorates">
            <FaSearch className="icon" />
            محافضات
          </Link>
        </div>
        <div className="regions">
          <Link to="/regions">
            <IoLocation className="icon" />
            المناطق
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
