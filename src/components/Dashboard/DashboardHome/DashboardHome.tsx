import Chart from "./Chart";
import Sale from "./Sale";
import TopShops from "./Shops";

const DashboardHome = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Chart />
        <TopShops />
        <Sale />
      </div>
    </div>
  );
};

export default DashboardHome;
