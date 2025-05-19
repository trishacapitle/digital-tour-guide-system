import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";


const MainLayout = () => {
  return (
      <div className="flex overflow-hidden w-[1024px] h-[600px] box-border">
        <Sidebar />
        <div className="content w-[944px]">
          <Outlet />
        </div>
      </div>
  )
}

export default MainLayout