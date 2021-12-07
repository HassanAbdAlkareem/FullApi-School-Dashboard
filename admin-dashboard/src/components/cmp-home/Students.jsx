import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import imgUser from "../../image/user.png";

const Teachers = () => {
  const { URL } = UseGlobelContext();
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const path = location.pathname;
  //

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/admin/get/students"
        );
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [path]);
  //
  return (
    <div className="parent-students">
      {students.length === 0 && <p className="no-yet">لايوجد طلاب بعد ...</p>}
      <div className="wrapper">
        <div className="row">
          {students.map((student, index) => {
            return (
              <div className="col-sm-12 col-lg-6 col-xl-4">
                <div className="student" key={student._id}>
                  <div className="img">
                    <img
                      src={student.profilePic ? student.profilePic : imgUser}
                    />
                  </div>
                  <div className="info">
                    {student.name && <span>الاسم : {student.name}</span>}
                    {student.governorate && (
                      <span>ألمحافضة : {student.governorate}</span>
                    )}
                    {student.phone && <span>الرقم : {student.phone}</span>}
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
