import React from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <MyInput type="text" placeholder="Enter Login" />
        <MyInput type="text" placeholder="Enter Password" />
        <MyButton>Log In</MyButton>
      </form>
    </div>
  );
};

export default Login;
