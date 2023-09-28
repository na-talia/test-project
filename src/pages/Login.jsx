import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Enter Login" />
        <MyInput type="text" placeholder="Enter Password" />
        <MyButton>Log In</MyButton>
      </form>
    </div>
  );
};

export default Login;
