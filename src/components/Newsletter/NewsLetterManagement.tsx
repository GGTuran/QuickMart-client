import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { unsubscribe } from "../../redux/features/newsLetter/newsLetterSlice";

const NewsLetterManagement = () => {
  const dispatch = useDispatch();
  const subscribers = useSelector(
    (state: RootState) => state.newsLetter.subscribers
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of subscribers per page
  const totalSubscribers = subscribers.length;
  const totalPages = Math.ceil(totalSubscribers / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = subscribers.slice(startIndex, endIndex);

  const handleRemove = (email: string) => {
    dispatch(unsubscribe(email));
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Newsletter Subscribers</h2>
      <Table className="bg-white shadow rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSubscribers.length > 0 ? (
            currentSubscribers.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell>{subscriber}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleRemove(subscriber)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No subscribers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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

export default NewsLetterManagement;
