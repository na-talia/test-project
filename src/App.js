import React, { useState, useRef } from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";

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
  const [body, setBody] = useState("");
  const [post, setPost] = useState({ title: "", body: "" });

  const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(bodyInputRef.current.value); // if just "bodyInputRef.current" without "value", then we will get the whole DOM-element <input>, but it is not recommended

    const newPost = {
      id: Date.now(),
      title,
      body,
    };

    console.log(newPost);
    setPosts([...posts, newPost]);
    setTitle("");
    setBody("");
  };

  const addNewPost2 = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(bodyInputRef.current.value); // if just "bodyInputRef.current" without "value", then we will get the whole DOM-element <input>, but it is not recommended

    const newPost2 = {
      id: Date.now(),
      title,
      body,
    };

    console.log(newPost2);
    setPosts2([...posts2, { ...post, id: Date.now() }]);

    setPost({ title: "", body: "" });
  };

  const createPost = (newPostForm) => {
    setPosts([...posts, newPostForm]);
  };

  // Get post from child component
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
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

        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Body"
        />

        {/* Add a new post using object */}

        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Post title Obj"
        />
        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type="text"
          placeholder="Body Obj"
        />

        {/* Uncontrolled component */}

        <MyInput ref={bodyInputRef} type="text" placeholder="Description" />
        <MyButton onClick={addNewPost}>Add a post</MyButton>
        <MyButton onClick={addNewPost2}>Add a post 2</MyButton>

        {/*  <MyButton disabled>Add a post</MyButton> */}
        {/*  <input ref={bodyInputRef} type="text" placeholder="using useRef()"></input> */}
      </form>
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <PostForm create={createPost} />

      {posts.length ? (
        <PostList
          remove={removePost}
          posts={posts}
          title="List of posts JavaScript"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>No posts found!</h1>
      )}
      <PostList posts={posts2} title="List of posts Python" />
    </div>
  );
}

export default App;
