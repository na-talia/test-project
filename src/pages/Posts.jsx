import React, { useState, useRef, useEffect } from "react";
import { usePosts } from "./hooks/usePosts";
import Counter from "./components/Counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import ClassCounter from "./components/ClassCounter";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";
import PostFilter from "./components/UI/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function Posts() {
  const [value, setValue] = useState("Text in input");
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description ljelkseg" },
    { id: 2, title: "JavaScript 2", body: "Description aaaaaaaaaaaaa" },
    { id: 3, title: "JavaScript 3", body: "Description bbb" },
  ]);

  const [posts2, setPosts2] = useState([
    { id: 1, title: "Python", body: "Description" },
    { id: 2, title: "Python 2", body: "Description" },
    { id: 3, title: "Python 3", body: "Description" },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState({ title: "", body: "" });
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"]; // console => Network => Headers: "x-total-count"
    setTotalPages(getPageCount(totalCount, limit));
  });

  console.log(totalPages);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

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

  // function getSortedPosts() {}

  // eslint-disable-next-line no-lone-blocks
  {
    /* const sortedPosts = getSortedPosts(); */
  }

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
  /* const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]))); // created a new [array] and then used Sorting, it helps not to modify previous array
  }; */

  useEffect(() => {
    fetchPosts();
  }, [page]);
  return (
    <div className="App">
      <button onClick={fetchPosts}>Get posts</button>
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
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create a post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h2> Something went wrong ${postError}</h2>}
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts} //* posts={posts} then posts={sortedPosts}
          title="List of posts JavaScript"
        />
      )}

      <PostList posts={posts2} title="List of posts Python" />
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
