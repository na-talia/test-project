import React, { useState } from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [value, setValue] = useState("Text in input");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);

  return (
    <div className="App">
      <Counter />
      <PostItem post={{ id: 1, title: "JavaScript", body: "Description" }} />
      <ClassCounter />
      <form>
        <MyInput type="text" placeholder="Post title" />
        <MyInput type="text" placeholder="Description" />
        <MyButton>Add a post</MyButton>
        {/*  <MyButton disabled>Add a post</MyButton> */}
      </form>
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <h1>List of posts</h1>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default App;
