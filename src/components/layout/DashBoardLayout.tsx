import Dashboard from "../Dashboard/Dashboard";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <div className="my-3 flex w-full gap-12">
          <div className="">
            <Dashboard />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
