import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div className="flex bg-gray-200">
        <Sidebar />
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <Header />
          <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6" >
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
