import { createBrowserRouter } from "react-router-dom";
import ClasssificationHome from "./components/home/ClassificationHome";
import RegressionHome from "./components/home/RegressionHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/register",
  },
  {
    element: <Home />,
    path: "/",
    children: [
      {
        element: <ClasssificationHome />,
        path: "classification",
      },
      {
        element: <RegressionHome />,
        path: "regression",
      },
      {
        element: <Profile />,
        path: "profile",
      },
    ],
  },
]);
