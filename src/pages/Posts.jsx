import React, { useState, useRef, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import "../styles/App.css";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostList from "../components/PostList";
import PostForm from "../components/UI/PostForm";
import PostFilter from "../components/UI/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import MyPosts from "./MyPosts";

function Posts() {
  const [value, setValue] = useState("Text in input");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description ljelkseg" },
    { id: 2, title: "JavaScript 2", body: "Description aaaaaaaaaaaaa" },
    { id: 3, title: "JavaScript 3", body: "Description bbb" },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState({ title: "", body: "" });
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"]; // console => Network => Headers: "x-total-count"
    setTotalPages(getPageCount(totalCount, limit));
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      body,
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setBody("");
  };

  const createPost = (newPostForm) => {
    setPosts([...posts, newPostForm]);
    setModal(false);
  };

  // Get post from child component
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  return (
    <div className="App">
      <MyPosts />
      <button onClick={fetchPosts}>Get posts</button>

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
        <MyButton onClick={addNewPost}>Add a posttttttttttttttttttttt</MyButton>
      </form>
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create a post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Number of elements"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Show all" },
        ]}
      />
      {postError && <h2> Something went wrong ${postError}</h2>}

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="List of posts JavaScript"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
