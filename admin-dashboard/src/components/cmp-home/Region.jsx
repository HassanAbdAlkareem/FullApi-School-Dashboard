import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, BsFillPlusCircleFill } from "react-icons/all";

const Region = () => {
  const [nameRegion, setNameRegion] = useState("");
  const [categoiresRegion, setCategoiresRegion] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  //
  useEffect(() => {
    const getRegion = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires/region"
        );
        setCategoiresRegion(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRegion();
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "https://api-schooll.herokuapp.com/api/categoires/region/" + id
      );
      const filter = categoiresRegion.filter((cate) => cate._id !== id);
      setCategoiresRegion(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "https://api-schooll.herokuapp.com/api/categoires/region",
        {
          nameRegion: nameRegion,
        }
      );
      console.log(res.data);
      setCategoiresRegion([...categoiresRegion, res.data]);
      setNameRegion("");
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
            placeholder="اضف منطقة جديدة"
            onChange={(e) => setNameRegion(e.target.value)}
            value={nameRegion}
          />
          <BsFillPlusCircleFill className="icon" onClick={handleAdd} />
        </div>
        {categoiresRegion.length == 0 && (
          <p className="no-yet">لاتوجد مناطق بعد ...</p>
        )}

        <div className="row">
          {categoiresRegion.map((cate) => (
            <div className="col-sm-12 col-lg-6  col-xl-4">
              <div className="cate">
                <p>المنطقة : {cate.nameRegion}</p>
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

export default Region;
