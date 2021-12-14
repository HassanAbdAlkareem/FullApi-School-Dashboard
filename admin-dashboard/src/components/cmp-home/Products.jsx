import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, BsCartFill } from "react-icons/all";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");

  //
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "https://api-schooll.herokuapp.com/images/";
  //
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://api-schooll.herokuapp.com/api/categoires-products/" + path
        );
        setName(res.data.nameProduct);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [path]);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", nameProduct);
      data.append("desc", desc);
      data.append("price", price);
      data.append("imageProduct", file);

      const res = await axios.post(
        "https://api-schooll.herokuapp.com/api/products/" + path,
        data
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "https://api-schooll.herokuapp.com/api/products/" + id,
        {
          data: { idCategoire: path },
        }
      );
      const filter = products.filter((cate) => cate._id !== id);
      setProducts(filter);
    } catch (error) {
      console.log(error);
    }
  };

  //
  return (
    <div className="products">
      <div className="wrapper">
        <div className="add-product">
          <div className="title">
            <h3>أضف منتج الى قسم {name}</h3>
          </div>

          <form onSubmit={handleAdd} encType="multipart/form-data">
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
                  filename="imageProduct"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button type="submit">
                أضافة المنتج <BsCartFill className="icon" />{" "}
              </button>
            </div>
          </form>
        </div>

        <div className="map-products">
          <h3> منتجات قسم {name} </h3>
          {products?.length == 0 && (
            <p style={{ margin: "2rem auto" }} className="no-yet">
              لاتوجد منتجات بعد ...
            </p>
          )}
          <div className="row">
            {products?.map((product) => {
              console.log(product._id);
              return (
                <div key={product._id} className="col-sm-12 col-lg-6 col-xl-3">
                  <div className="product">
                    <div className="card">
                      {product.imageProduct && (
                        <div className="img">
                          <img src={PF + product.imageProduct} />
                        </div>
                      )}
                      <div className="info-card">
                        <p>ألاسم : {product.name}</p>
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
