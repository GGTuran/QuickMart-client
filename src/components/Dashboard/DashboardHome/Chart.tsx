import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllShopsQuery } from "@/redux/features/shop/shopApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { ChartLegend, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"];

const Chart = () => {
  const { data: usersData } = useGetAllUsersQuery("");
  const { data: productsData } = useGetAllProductsQuery("");
  const { data: shopsData } = useGetAllShopsQuery("");
  const { data: categoriesData } = useGetAllCategoryQuery("");
  const { data: ordersData } = useGetAllOrdersQuery("");

  const totalUsers = usersData?.data?.length || 0;
  const totalProducts = productsData?.data?.length || 0;
  const totalShops = shopsData?.data?.length || 0;
  const totalCategories = categoriesData?.data?.length || 0;
  const totalOrders = ordersData?.data?.length || 0;

  const data = [
    { name: "Users", value: totalUsers },
    { name: "Products", value: totalProducts },
    { name: "Shops", value: totalShops },
    { name: "Categories", value: totalCategories },
    { name: "Orders", value: totalOrders },
  ];

  return (
    <div className="p-4 space-y-8">
      {/* Pie Chart */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              fill="#8884d8"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltipContent />
            <ChartLegend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
