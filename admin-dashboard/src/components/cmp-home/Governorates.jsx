import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, BsFillPlusCircleFill } from "react-icons/all";

const Governorates = () => {
  const [nameGovernorate, setNameGovernorate] = useState("");
  const [categoiresGovernorates, setCategoiresGovernorates] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  //
  useEffect(() => {
    const getGovernorates = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/categoires/governorates"
        );
        setCategoiresGovernorates(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGovernorates();
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "http://localhost:5000/api/categoires/governorates/" + id
      );
      const filter = categoiresGovernorates.filter((cate) => cate._id !== id);
      setCategoiresGovernorates(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/categoires/governorates",
        {
          nameGovernorate: nameGovernorate,
        }
      );
      console.log(res.data);
      setCategoiresGovernorates([...categoiresGovernorates, res.data]);
      setNameGovernorate("");
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
            placeholder="اضف محافضة جديدة"
            onChange={(e) => setNameGovernorate(e.target.value)}
            value={nameGovernorate}
          />
          <BsFillPlusCircleFill className="icon" onClick={handleAdd} />
        </div>
        {categoiresGovernorates.length == 0 && (
          <p className="no-yet">لاتوجد محافضات بعد ...</p>
        )}
        <div className="row">
          {categoiresGovernorates.map((cate) => (
            <div className="col-sm-12 col-lg-6  col-xl-4">
              <div className="cate">
                <p>المحافضة : {cate.nameGovernorate}</p>
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

export default Governorates;
