import { Star, StarIcon } from 'lucide-react';


const Rating = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <Star key={i} className="text-yellow-500 fill-yellow-500 " />
      ) : (
        <StarIcon key={i} className="text-gray-500" />
      )
    );
  }
  return stars;
};

export default Rating;