import { useState } from "react";
import React from "react";
import MyButton from "../components/UI/button/MyButton";
import PostList from "../components/PostList";

const MyPosts = () => {
  const [posts2, setPosts2] = useState([
    { id: 1, title: "Python", body: "Description" },
    { id: 2, title: "Python 2", body: "Description" },
    { id: 3, title: "Python 3", body: "Description" },
  ]);
  const [post, setPost] = useState({ title: "", body: "" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNewPost2 = (e) => {
    e.preventDefault();

    const newPost2 = {
      id: Date.now(),
      title,
      body,
    };

    console.log(newPost2);
    setPosts2([...posts2, { ...post, id: Date.now() }]);

    setPost({ title: "", body: "" });
  };
  return (
    <div>
      <PostList posts={posts2} title="List of posts Python" />

      <MyButton onClick={addNewPost2}>Add a post 2fsdkfjlsjfkjkfjdsj</MyButton>
    </div>
  );
};

export default MyPosts;
