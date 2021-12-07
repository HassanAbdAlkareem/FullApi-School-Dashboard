import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import imgUser from "../../image/user.png";

const Teachers = () => {
  const { URL } = UseGlobelContext();
  const [teachers, setTeachers] = useState([]);
  const location = useLocation();
  const path = location.pathname;
  //

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/admin/get/teachers"
        );
        setTeachers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeachers();
  }, [path]);
  //
  return (
    <div className="parent-teacher">
      {teachers.length === 0 && <p className="no-yet">لايوجد مدرسين بعد ...</p>}
      <div className="wrapper">
        <div className="row">
          {teachers.map((teacher, index) => {
            return (
              <div className="col-sm-12 col-lg-6 col-xl-4">
                <div className="teacher" key={teacher._id}>
                  <div className="img">
                    <img
                      src={teacher.profilePic ? teacher.profilePic : imgUser}
                    />
                  </div>
                  <div className="info">
                    {teacher.name && <span>الاسم : {teacher.name}</span>}
                    {teacher.governorate && (
                      <span>ألمحافضة : {teacher.governorate}</span>
                    )}
                    {teacher.phone && <span>الرقم : {teacher.phone}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
