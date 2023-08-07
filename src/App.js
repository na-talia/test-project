import React, { useState } from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";
import PostList from "./components/PostList";

function App() {
  const [value, setValue] = useState("Text in input");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);

  const [posts2, setPosts2] = useState([
    { id: 1, title: "Python", body: "Description" },
    { id: 2, title: "Python 2", body: "Description" },
    { id: 3, title: "Python 3", body: "Description" },
  ]);

  return (
    <div className="App">
      <Counter />
      <PostItem post={{ id: 1, title: "Static title", body: "Description" }} />

      <ClassCounter />
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <PostList posts={posts} title="List of posts JavaScript" />
      <PostList posts={posts2} title="List of posts Python" />
    </div>
  );
}

export default App;
