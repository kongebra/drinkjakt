import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export interface RatingProps {
  rating?: number;
  color?: string;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({
  rating = 0,
  color = "text-teal-500",
  size = 16,
}) => {
  return (
    <div className={`flex gap-1 ${color}`}>
      {[0, 1, 2, 3, 4].map((value, index) => {
        const roundedRating = Math.round(rating * 2) / 2;

        if (roundedRating - value >= 1) {
          return <FaStar key={index} size={size} />;
        }

        if (roundedRating - value === 0.5) {
          return <FaStarHalfAlt key={index} size={size} />;
        }

        return <FaRegStar key={index} size={size} />;
      })}
    </div>
  );
};

export default Rating;
