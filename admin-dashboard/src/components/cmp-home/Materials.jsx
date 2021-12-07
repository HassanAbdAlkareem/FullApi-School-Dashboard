import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, BsFillPlusCircleFill } from "react-icons/all";

const Materials = () => {
  const [nameMaterial, setNameMaterails] = useState("");
  const [categoires, setCategoires] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  //
  useEffect(() => {
    const getMaterials = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires/materails"
        );
        setCategoires(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMaterials();
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "https://api-schooll.herokuapp.com/api/categoires/materails/" + id
      );
      const filter = categoires.filter((cate) => cate._id !== id);
      setCategoires(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "https://api-schooll.herokuapp.com/api/categoires/materails",
        {
          nameMaterial: nameMaterial,
        }
      );
      console.log(res.data);
      setCategoires([...categoires, res.data]);
      setNameMaterails("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="materails">
      <div className="wrapper">
        <div className="add-cate">
          <input
            type="text"
            placeholder="اضف مادة جديدة"
            onChange={(e) => setNameMaterails(e.target.value)}
            value={nameMaterial}
          />
          <BsFillPlusCircleFill className="icon" onClick={handleAdd} />
        </div>
        {categoires.length == 0 && <p className="no-yet">لايوجد مواد ...</p>}
        <div className="row">
          {categoires.map((cate) => (
            <div className="col-sm-12 col-lg-6  col-xl-4">
              <div className="cate">
                <p>المادة التدريسية : {cate.nameMaterial}</p>
                <AiFillDelete
                  className="icon"
                  onClick={() => handleDelete(cate._id)}
                ></AiFillDelete>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;
