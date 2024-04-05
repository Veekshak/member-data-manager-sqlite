import { Outlet } from "react-router-dom";
import SideBar from "./elements/SideBar";

export default function RootLayout() {
  return (
    <>
      <div className="bg-blue-100 flex h-screen">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
