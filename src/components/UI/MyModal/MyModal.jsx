import React from "react";
import cl from "./MyModal.module.css";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModal];
  if (visible) {
    rootClasses.push(cl.active);
  }
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      {" "}
      {/* onClick => closes a modal window */}
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* stopPropagation => doesn`t close a modal window when clicking on it */}
        {children}
      </div>
    </div>
  );
};

export default MyModal;
