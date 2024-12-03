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
  const shops = data?.data;

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      console.log(id, "id for deleteing");
      await deleteShop(id).unwrap();
      toast.success("Shop deleted successfully!");
    } catch (error) {
      toast.error("Error deleting shop. Please try again.");
      console.error("Error deleting shop:", error);
    }
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
            <TableHead>description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops?.map((shop: any) => (
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
    </div>
  );
};

export default ShopManagement;
