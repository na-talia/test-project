import React, { useState } from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";

function App() {
  const [value, setValue] = useState("Text in input");

  return (
    <div className="App">
      <Counter />
      <PostItem post={{ id: 1, title: "JavaScript", body: "Description" }} />
      <ClassCounter />
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default App;
