import { Outlet } from "react-router-dom";
import { SideBarHome } from "../components/home/SideBarHome";

export default function Home() {
  return (
    <div className="flex">
      <div>
        <SideBarHome />
      </div>
      <Outlet />
    </div>
  );
}
