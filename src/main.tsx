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
import { store } from "./app/store";

import "./index.css";
import Errorpage from "./routes/Errorpage";
import Chat from "./components/Chat";
import Login from "./routes/Login";
import UserChat from "./routes/UserChat";
import { Provider } from "react-redux";
import { loader as appLoader } from "./routes/App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<App />}
        //this is for th useRouterLoaderData in chatheader
        id="app"
        loader={appLoader}
        errorElement={<Errorpage />}
      >
        <Route errorElement={<Errorpage chatError />}>
          <Route path="users/:userName/:userId" element={<UserChat />} />
          <Route index element={<Chat />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={<Login />}
        errorElement={<Errorpage />}
      ></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
