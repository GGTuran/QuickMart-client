import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi"; // Update with your API slice
import { useGetProfileQuery } from "@/redux/features/user/userApi"; // For fetching user data
import { Button } from "../ui/button";

type AddReviewModalProps = {
  productId: string; // Product ID will be passed as a prop
};

const AddReviewModal = ({ productId }: AddReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const { data: userProfile } = useGetProfileQuery(""); // Fetch user profile data for userId
  const userId = userProfile?.data?._id;

  const [addReview, { isLoading }] = useAddReviewMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (rating <= 0 || rating > 5 || !comment.trim()) {
      toast.error("Please provide a valid rating (1-5) and comment.");
      return;
    }

    // Prepare the review data
    const reviewData = {
      userId,
      productId,
      rating,
      comment,
    };

    try {
      console.log(reviewData, "data");
      await addReview(reviewData).unwrap();
      setRating(0);
      setComment("");
      toast.success("Review added successfully!");
    } catch (error) {
      toast.error("Error adding review. Please try again.");
      console.error("Error adding review:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Review</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Review</DialogTitle>
            <DialogDescription>Share your feedback</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              {/* Rating Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating (1-5)
                </Label>
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  id="rating"
                  className="col-span-3"
                  min="1"
                  max="5"
                  step="1"
                />
              </div>

              {/* Comment Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comment" className="text-right">
                  Comment
                </Label>
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  id="comment"
                  className="col-span-3"
                  // as="textarea"
                  // rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Submit Review"}
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddReviewModal;
