import React, { useState, useRef } from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
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

  const [title, setTitle] = useState("");

  const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(bodyInputRef.current.value); // if just "bodyInputRef.current" without "value", then we will get the whole DOM-element <input>, but it is not recommended
  };

  return (
    <div className="App">
      <Counter />
      <PostItem post={{ id: 1, title: "Static title", body: "Description" }} />

      <ClassCounter />
      <form>
        {/* Controlled component */}

        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Post title"
        />

        {/* Uncontrolled component */}

        <MyInput ref={bodyInputRef} type="text" placeholder="Description" />
        <MyButton onClick={addNewPost}>Add a post</MyButton>
        {/*  <MyButton disabled>Add a post</MyButton> */}
        {/* <input ref={bodyInputRef} type="text" placeholder="hhhhhhhhhh"></input> */}
      </form>
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
