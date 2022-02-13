import { Rating } from "@studio/schema";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export interface RatingStarsProps {
  ratings: Array<Rating> | undefined;

  color?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  ratings,
  color = "#007bff",
}) => {
  const rating = React.useMemo(() => {
    if (ratings === undefined) {
      return 0;
    }

    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce(
      (acc, current) => acc + (current.rating || 0),
      0
    );

    return sum / ratings.length;
  }, [ratings]);

  return (
    <div className="d-flex gap-1 align-items-center">
      {[...Array(5)].map((_, index) => {
        const roundedRating = Math.round(rating * 2) / 2;
        if (roundedRating - index >= 1) {
          return <FaStar key={index} color={color} />;
        }

        if (roundedRating - index === 0.5) {
          return <FaStarHalfAlt key={index} color={color} />;
        }

        return <FaRegStar key={index} color={color} />;
      })}
    </div>
  );
};

export default RatingStars;
