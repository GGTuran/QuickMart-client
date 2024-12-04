import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Table components

const CustomerReviews = ({ reviews }) => {
  console.log(reviews, "fetched reviews");

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

      {/* Render table if there are reviews */}
      {reviews?.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews?.map((review, index) => (
              <TableRow key={index}>
                <TableCell>{review?.userId?.name}</TableCell>
                <TableCell>{review?.comment}</TableCell>
                <TableCell>
                  <span className="text-yellow-500">{review?.rating} / 5</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomerReviews;
