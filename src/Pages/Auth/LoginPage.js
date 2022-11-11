import React, {useState, useEffect} from "react";
import {LoginUser, checkUserAuthentication} from "../../api/Auth";

const LoginPage = ({setAuthenticated}) => {
  const [inputData, setInputData] = useState({
    email: " ",
    password: " ",
  });
  const [errors, setErrors] = useState("");
  const handleChange = ({target: {id, value}}) => {
    setInputData({...inputData, [id]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!inputData.email || !inputData.password)
      return setErrors("field cannot be empty");
    const LoginResponse = await LoginUser(inputData.email, inputData.password);
    if (!LoginResponse.success) return setErrors(LoginResponse.message);

    setAuthenticated(true);
  };
  return (
    <div className="container mt-5 d-flex flex-column">
      <p className="text-center fs-3">Login into admin panel</p>
      <form
        className="align-self-center d-flex flex-column"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control p-3 fs-5"
            id="email"
            placeholder="email"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control p-3 fs-5"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary p-2 mt-3">
          Login
        </button>
      </form>
      {errors && (
        <div className="alert alert-danger mt-4" role="alert">
          {errors}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
