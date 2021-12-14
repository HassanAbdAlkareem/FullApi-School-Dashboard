import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiFillDelete,
  BsFillPlusCircleFill,
  AiTwotoneEdit,
} from "react-icons/all";
import { useLocation } from "react-router-dom";

const SectionProducts = () => {
  const [categoiresProducts, setCategoiresProducts] = useState([]);
  const [modeUpdate, setModeUpdate] = useState(false);
  const [nameCategoirey, setNameCategoirey] = useState("");
  const [updateNameCate, setUpdateNameCate] = useState("");
  const { search } = useLocation();

  //
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires-products/"
        );
        setCategoiresProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [search]);

  const handleAddCategoiry = async () => {
    try {
      const res = await axios.post(
        "https://api-schooll.herokuapp.com/api/categoires-products/",
        {
          nameProduct: nameCategoirey,
        }
      );
      setCategoiresProducts([...categoiresProducts, res.data]);
      window.location.reload();
      setNameCategoirey("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteCategoiry = async (id) => {
    try {
      await axios.delete(
        "https://api-schooll.herokuapp.com/api/categoires-products/" + id
      );
      const filter = categoiresProducts.filter((cate) => cate._id != id);
      setCategoiresProducts(filter);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateCategoire = async (id) => {
    try {
      await axios.put(
        "https://api-schooll.herokuapp.com/api/categoires-products/" + id,
        {
          nameProduct: updateNameCate,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="parent-section">
      <div className="add-section">
        <h4>أضف قسم الى اقسام المنتجات</h4>
        <div className="parent-input">
          <input
            value={nameCategoirey}
            onChange={(e) => setNameCategoirey(e.target.value)}
          />
          <BsFillPlusCircleFill className="icon" onClick={handleAddCategoiry} />
        </div>
      </div>
      <div className="display-sections">
        <h4> جميع الاقسام</h4>
        <p>في حال قمت بحذف قسم مُعين سيتم حذف كُل المنتجات بداخله !</p>
        <div className="row">
          {categoiresProducts.map((cate, index) => {
            return (
              <div className="col-sm-12 col-lg-6 col-xl-4">
                <div className="info-section">
                  <div className="wrapper">
                    <span>{cate.nameProduct} </span>
                    <div className="edit-delete">
                      <AiFillDelete
                        onClick={() => handleDeleteCategoiry(cate._id)}
                        className="icon-delete"
                      />

                      <AiTwotoneEdit
                        onClick={() => setModeUpdate(index)}
                        onDoubleClickCapture={() => setModeUpdate(null)}
                        className="icon-update"
                      />
                    </div>
                  </div>
                  {modeUpdate === index && (
                    <div className="update-mode">
                      <input
                        placeholder={cate.nameProduct}
                        onChange={(e) => setUpdateNameCate(e.target.value)}
                      />
                      <button onClick={() => handleUpdateCategoire(cate._id)}>
                        تحديث
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionProducts;
