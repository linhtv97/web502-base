import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PostsPage from "./pages/PostsPage";
import PostsAddPage from "./pages/PostsAddPage";
import PostsUpdatePage from "./pages/PostsUpdatePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/posts/add",
    element: <PostsAddPage />,
  },
  {
    path: "/posts/edit/:id",
    element: <PostsUpdatePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <div>Home page</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
