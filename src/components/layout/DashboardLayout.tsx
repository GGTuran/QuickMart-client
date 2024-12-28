import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"; // Assuming Dashboard is your sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4 flex-shrink-0">
        <Dashboard />
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
