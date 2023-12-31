import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import MyPosts from "../pages/MyPosts";

export const privateRoutes = [
  { path: "/", element: Posts, exact: true },
  { path: "/myposts", element: MyPosts, exact: true },
  { path: "/login", element: Posts, exact: true },
  { path: "/about", element: About, exact: true },
  { path: "/posts", element: Posts, exact: true },
  { path: "/posts/:id", element: PostIdPage, exact: true },
];

export const publicRoutes = [{ path: "/login", element: Login, exact: true }];
