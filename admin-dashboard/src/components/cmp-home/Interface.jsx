import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GiTeacher,
  IoSchoolSharp,
  SiSololearn,
  FaSearch,
  IoLocation,
  FaShoppingCart,
} from "react-icons/all";
import { UseGlobelContext } from "../../context/FunctionAlContext";
const Interface = () => {
  const [lengthTeachers, setLengthTeachers] = useState(0);
  const [lengthstudents, setLengthStudents] = useState(0);
  const [lengthMaterials, setLengthMaterials] = useState(0);
  const [lengthGover, setLengthGover] = useState(0);
  const [lengthRegion, setLengthRegion] = useState(0);
  const [lengthProducts, setLengthProducts] = useState(0);

  const { URL } = UseGlobelContext();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const resTeachers = await axios.get(
          "https://api-schooll.herokuapp.com/api/admin/get/teachers"
        );
        setLengthTeachers(resTeachers.data.length);
        //
        const resStudents = await axios.get(
          "https://api-schooll.herokuapp.com/api/admin/get/students"
        );
        setLengthStudents(resStudents.data.length);
        //
        const resMaterails = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires/materails"
        );
        setLengthMaterials(resMaterails.data.length);
        //
        const resGover = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires/governorates"
        );
        setLengthGover(resGover.data.length);
        //
        const resRegion = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires/region"
        );
        setLengthRegion(resRegion.data.length);
        //
        const resProducts = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires-products"
        );
        setLengthProducts(resProducts.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getTeachers();
  }, []);

  return (
    <div className="interface">
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <GiTeacher className="icon" />
              <span> عدد الأساتذة {lengthTeachers}</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <IoSchoolSharp className="icon" />
              <span>عدد الطلاب {lengthstudents}</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <SiSololearn className="icon" />
              <span>عدد المواد التدريسية {lengthMaterials}</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <FaSearch className="icon" />
              <span>عدد المحافضات {lengthGover}</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <IoLocation className="icon" />
              <span>عدد المناطق {lengthRegion}</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
            <div className="count">
              <FaShoppingCart className="icon" />
              <span>عدد اقسام المنتجات {lengthProducts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
