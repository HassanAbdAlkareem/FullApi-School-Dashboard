import React, { useState } from "react";
import axios from "axios";
import { UseGlobelContext } from "../context/FunctionAlContext.jsx";

const Login = () => {
  const [error, setError] = useState(false);
  const { setAdmin, URL } = UseGlobelContext();
  //
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(URL + "login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);
      res.data && window.location.replace("/");
      setAdmin(res.data);
      //
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="for-margin">
        <h2>يرجى تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div className="input">
              <label className="label">البريد الالكتروني</label>
              <input onChange={handleChange} name="email" />
            </div>
            <div className="input">
              <label className="label">كلمة السر</label>
              <input onChange={handleChange} name="password" />
            </div>

            {error && (
              <span className="error-message">
                شيءً ما خاطئ يرجى أدخال معلومات صحيحة
              </span>
            )}
          </div>
          <div className="button">
            <button type="submit">تسجيل الدخول</button>
          </div>
        </form>
        {/* */}
      </div>
    </div>
  );
};

export default Login;
