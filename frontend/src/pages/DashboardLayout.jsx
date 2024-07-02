import { Navbar } from "../components/DashboardComponents/Navbar";
import { Sidebar } from "../components/DashboardComponents/Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 flex-grow overflow-auto">
          <Outlet />

          {location.pathname === "/layout" ? (
            <div>
              <h1 className="text-center my-10 text-4xl ">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold text-6xl">
                  {" "}
                  WorkWAVE
                </span>
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
