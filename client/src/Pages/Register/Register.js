import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Alert from "../../Components/Alert";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  isMember: true,
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { displayAlert, showAlert, isLoading, user, setupUser } =
    useAppContext();
  const navigate = useNavigate();

  const toggleRegister = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/chat");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="register-box">
      <div className="logo">
        <IconContext.Provider value={{ className: "registerLogo" }}>
          <AiOutlineMail size={40} color="white" />
        </IconContext.Provider>
      </div>
      <h4 className="register-text">
        {!values.isMember ? "Register" : "Login"}
      </h4>
      {showAlert && <Alert />}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          {!values.isMember && (
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            className="form-control shadow-none"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button className="registerBtn" disabled={isLoading}>
            {values.isMember ? "Login" : "Register"}
          </button>
        </form>
        {values.isMember
          ? "Don't have an account?"
          : "Already have an Account?"}
        <button onClick={toggleRegister} className="signIntogglerBtn ms-1">
          {values.isMember ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Register;
