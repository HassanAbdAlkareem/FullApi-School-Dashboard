import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const Cart = () => {
  const [dataCart, setDataCart] = useState([]);
  const { search } = useLocation();
  //
  const PF = "https://api-schooll.herokuapp.com/images/";
  //AYQL2193.JPG
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart/");
        setDataCart(res.data[0]);
        console.log(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [search]);

  return (
    <div className="cart">
      <h2>المنتجات التي تم طلبها</h2>
      <div className="row">
        {dataCart?.products?.map((product) => {
          console.log(product?.productId?.imageProduct);
          return (
            <div
              key={product?.productId?._id}
              className="col-sm-12 col-lg-6 col-xl-3"
            >
              <div className="product">
                <div className="card">
                  {product?.productId?.imageProduct && (
                    <div className="img">
                      <img src={PF + product?.productId?.imageProduct} />
                    </div>
                  )}
                  <div className="info-card">
                    <p>ألاسم : {product.productId?.name}</p>
                    <p>السعر : {product.productId?.price}$</p>
                    <p>الكمية : {product.quantity}</p>
                    <p>حالة الشراء : {product.productId?.status}</p>
                    <p>العنوان : {product.productId?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
