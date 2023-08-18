import React, { useState } from "react";
import MyInput from "./input/MyInput";
import MyButton from "./button/MyButton";

const PostForm = ({ create }) => {
  const [post, setPostForm] = useState({ title: "", body: "" });

  const addNewPostForm = (e) => {
    e.preventDefault();

    const newPostForm = {
      ...post,
      id: Date.now(),
    };
    create(newPostForm);
    setPostForm({ title: "", body: "" });
  };
  return (
    <form>
      {/* Add a new post using object */}

      <MyInput
        value={post.title}
        onChange={(e) => setPostForm({ ...post, title: e.target.value })}
        type="text"
        placeholder="POSTFORM"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPostForm({ ...post, body: e.target.value })}
        type="text"
        placeholder="Body Obj"
      />

      {/* Uncontrolled component */}

      <MyButton onClick={addNewPostForm}>Add a post 2</MyButton>

      {/*  <MyButton disabled>Add a post</MyButton> */}
      {/*  <input ref={bodyInputRef} type="text" placeholder="using useRef()"></input> */}
    </form>
  );
};

export default PostForm;
