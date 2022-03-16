import clsx from "clsx";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface RatingProps {
  rating?: number;
  color?: string;
  size?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating = 0,
  color = "text-amber-500",
  className,
}) => {
  return (
    <div className={`flex gap-1 ${color}`}>
      {[0, 1, 2, 3, 4].map((value, index) => {
        const roundedRating = Math.round(rating * 2) / 2;
        let Icon: IconType = FaRegStar;

        if (roundedRating - value >= 1) {
          Icon = FaStar;
        }

        if (roundedRating - value === 0.5) {
          Icon = FaStarHalfAlt;
        }

        return <Icon key={index} className={clsx("text-base", className)} />;
      })}
    </div>
  );
};

export default Rating;
