import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  useGetAllShopsQuery,
  useDeleteShopMutation,
} from "@/redux/features/shop/shopApi";
import toast, { Toaster } from "react-hot-toast";

const ShopManagement = () => {
  const { data, isLoading } = useGetAllShopsQuery("");
  const [deleteShop, { isLoading: isDeleting }] = useDeleteShopMutation();
  const shops = data?.data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalItems = shops.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShops = shops.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteShop(id).unwrap();
      toast.success("Shop deleted successfully!");
    } catch (error) {
      toast.error("Error deleting shop. Please try again.");
      console.error("Error deleting shop:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Shop Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentShops.map((shop: any) => (
            <TableRow key={shop._id}>
              <TableCell>{shop.name}</TableCell>
              <TableCell>{shop.description}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(shop._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShopManagement;
