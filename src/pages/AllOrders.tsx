import Loading from "@/components/Loading/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useState } from "react";

const AllOrders = () => {
  const { data: orderData, isLoading } = useGetAllOrdersQuery("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define the number of orders per page
  const orders = orderData?.data || [];
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="rounded-md border overflow-x-auto">
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
            {currentPageOrders.map((order: any) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AllOrders;
