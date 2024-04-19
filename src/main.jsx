import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Login, SignUp, LogoutBtn } from "./components/index.js";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import AddChirp from "./pages/AddChirp.jsx";
import EditChirp from "./pages/EditChirp.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/logout",
        element: <LogoutBtn />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/add-chirp",
        element: <AddChirp />,
      },
      {
        path: "/edit-chirp/:slug",
        element: <EditChirp />,
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
