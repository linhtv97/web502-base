import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import PostsPage from "./pages/PostsPage";
import PostAdd from "./pages/PostAdd";
import PostEdit from "./pages/PostEdit";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/posts/add",
    element: <PostAdd />,
  },
  {
    path: "/posts/edit/:id",
    element: <PostEdit />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
