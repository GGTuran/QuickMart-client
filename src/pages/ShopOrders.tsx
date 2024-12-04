import Loading from "@/components/Loading/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersByShopIdQuery } from "@/redux/features/order/orderApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

const ShopOrders = () => {
  const { data } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const person = data?.data;

  const { data: orderData, isLoading } = useGetOrdersByShopIdQuery(person?._id);
  //   console.log(orderData?.data, "order");
  const orders = orderData?.data;

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any) => (
            <TableRow key={order?._id}>
              <TableCell>{order?._id}</TableCell>
              <TableCell>
                {new Date(order?.orderDate)?.toLocaleDateString()}
              </TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell>
                {order?.products
                  ?.map((product: any) => product?.name)
                  .join(", ")}
              </TableCell>
              <TableCell>
                $
                {order?.products
                  ?.map((product: any) => product?.price)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {order?.products
                  ?.map((product: any) => `${product?.discount}%`)
                  .join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShopOrders;
