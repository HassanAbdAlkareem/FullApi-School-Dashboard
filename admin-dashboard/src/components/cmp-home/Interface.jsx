import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GiTeacher,
  IoSchoolSharp,
  CgComponents,
  FaSearch,
  IoLocation,
} from "react-icons/all";
import { UseGlobelContext } from "../../context/FunctionAlContext";
const Interface = () => {
  const [lengthTeachers, setLengthTeachers] = useState(0);
  const [lengthstudents, setLengthStudents] = useState(0);
  const [lengthMaterials, setLengthMaterials] = useState(0);
  const [lengthGover, setLengthGover] = useState(0);
  const [lengthRegion, setLengthRegion] = useState(0);

  const { URL } = UseGlobelContext();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const resTeachers = await axios.get(URL + "get/teachers");
        setLengthTeachers(resTeachers.data.length);
        const resStudents = await axios.get(URL + "get/students");
        setLengthStudents(resStudents.data.length);
        const resMaterails = await axios.get(
          "http://localhost:5000/api/categoires/materails"
        );
        setLengthMaterials(resMaterails.data.length);
        const resGover = await axios.get(
          "http://localhost:5000/api/categoires/governorates"
        );
        setLengthGover(resGover.data.length);
        const resRegion = await axios.get(
          "http://localhost:5000/api/categoires/region"
        );
        setLengthRegion(resRegion.data.length);
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
              <CgComponents className="icon" />
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
        </div>
      </div>
    </div>
  );
};

export default Interface;
