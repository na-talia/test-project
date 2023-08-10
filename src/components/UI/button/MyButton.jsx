import React from "react";
import classes from "./MyButton.module.css"; // could be written anything here instesd of "classes"

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {/* Addind {...props} here, so it could be used anywhere. E.g. disabled could be added into <MyButton> an it will work. Without ...props here if won`t work */}
      {children}
    </button>
  );
};

export default MyButton;
