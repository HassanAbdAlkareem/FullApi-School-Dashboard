import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, BsFillPlusCircleFill } from "react-icons/all";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(null);
  //
  const location = useLocation();
  const path = location.pathname;
  const PF = "http://localhost:5000/images/";
  //
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/categoires-products"
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/categoires-products/" + id);
      const filter = products.filter((cate) => cate._id !== id);
      setProducts(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      nameProduct,
      desc,
      price,
      status: 0,
    };

    try {
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newProduct.imageProduct = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
          setFile(null);
        } catch (error) {
          console.log(error);
        }
      }
      //
      const res = await axios.post(
        "http://localhost:5000/api/categoires-products",
        newProduct
      );

      setProducts([...products, res.data]);
      setNameProduct("");
      setDesc("");
      setPrice("");
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);
  return (
    <div className="products">
      <div className="wrapper">
        <div className="add-product">
          <h3>أضف منتج</h3>

          <form onSubmit={handleAdd}>
            <div className="row">
              <div className="col-sm-12 col-lg-6 col-xl-3">
                <label> (المادة الدراسية) أسم المنتج </label>
                <input
                  required
                  type="text"
                  name="nameProduct"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-lg-6 col-xl-3">
                <label> وصف المنتج </label>
                <input
                  type="text"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-lg-6 col-xl-3">
                <label> سعر المنتج </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-lg-6 col-xl-3">
                <label> صورة المنتج </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button type="submit">أضف </button>
            </div>
          </form>
        </div>

        <div className="map-products">
          <h3> المنتجات </h3>
          {products.length == 0 && (
            <p style={{ margin: "2rem auto" }} className="no-yet">
              لاتوجد منتجات بعد ...
            </p>
          )}
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-sm-12 col-lg-6 col-xl-3">
                  <div className="product">
                    <div className="card">
                      {product.imageProduct && (
                        <div className="img">
                          <img src={PF + product.imageProduct} />
                        </div>
                      )}
                      <div className="info-card">
                        <p>ألاسم : {product.nameProduct}</p>
                        <p>الوصف : {product.desc}</p>
                        <p>السعر : {product.price}$</p>
                        <AiFillDelete
                          className="icon"
                          onClick={() => handleDelete(product._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
