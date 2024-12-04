const CustomerReviews = ({ reviews }) => {
  console.log(reviews, "fetched reviews");
  return (
    <div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
        {reviews?.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews?.map((review: any, index: any) => (
            <div
              key={index}
              className="border-t border-gray-200 py-4 flex justify-center items-center gap-5"
            >
              <p className="font-semibold">{review?.userId?.name}</p>
              <p className="text-sm">{review?.comment}</p>
              <p className="text-sm text-yellow-500">
                Rating: {review?.rating}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
