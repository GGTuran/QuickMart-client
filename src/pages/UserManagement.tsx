import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  usePromoteUserMutation,
} from "@/redux/features/user/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast, { Toaster } from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const { data: usersData, isLoading, error } = useGetAllUsersQuery("");
  const [deleteUser] = useDeleteUserMutation();
  const [promoteUser] = usePromoteUserMutation();

  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isPromoting, setIsPromoting] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define the number of users per page

  const users = usersData?.data || [];
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageUsers = users.slice(startIndex, endIndex);

  const handleDeleteUser = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePromoteUser = async (id: string) => {
    setIsPromoting(id);
    try {
      await promoteUser(id).unwrap();
      toast.success("User promoted to admin successfully");
    } catch (error) {
      toast.error("Failed to promote user to admin");
    } finally {
      setIsPromoting(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Email</TableHead>
              <TableHead className="px-4 py-2">Role</TableHead>
              <TableHead className="px-4 py-2 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageUsers.map((user: User) => (
              <TableRow key={user._id} className="text-sm">
                <TableCell className="px-4 py-2 font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="px-4 py-2">{user.email}</TableCell>
                <TableCell className="px-4 py-2">{user.role}</TableCell>
                <TableCell className="px-4 py-2 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePromoteUser(user._id)}
                    disabled={isPromoting === user._id}
                  >
                    {isPromoting === user._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Promote"
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={isDeleting === user._id}
                  >
                    {isDeleting === user._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
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
}
