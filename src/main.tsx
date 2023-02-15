import { createBrowserHistory } from "@remix-run/router";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "./routes/App";
import "./index.css";
import Errorpage from "./routes/Errorpage";
import Chat from "./components/Chat";
import Login from "./routes/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route errorElement={<Errorpage />}>
          <Route path="user/:userId" element={<Chat />} />
          <Route index element={<Chat />} />
        </Route>
      </Route>
      <Route path="Login" element={<Login />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
