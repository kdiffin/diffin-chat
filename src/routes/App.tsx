import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import UseDarkMode from "../custom-hooks/UseDarkMode";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const search: string | null = url.searchParams.get("search");
  return search;
}

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [darkMode, setDarkMode] = UseDarkMode();
  const [user, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();
  const search: any = useLoaderData();

  //then push to db doc by id
  //todo: fix that trash users database lmfao

  useEffect(() => {
    const searchObj = document.getElementById("search") as HTMLInputElement;
    searchObj.value = search;
  }, [search]);

  useEffect(() => {
    if (!loading) {
      !user && navigate("/login");
    }
  }, [user, loading]);

  return (
    <div
      className={` dark:bg-zinc-800 dark:text-white  bg-zinc-200/50 text-zinc-700
       [&>*]:transition [&>*]:duration-500  app  transition duration-500
      ${expandSidebar ? "openSidebar" : " closedSidebar"}  h-screen `}
    >
      <Sidebar
        expandSidebar={expandSidebar}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setExpandSidebar={setExpandSidebar}
      />
      <Outlet />
      <Users search={search} />
    </div>
  );
}

export default App;
