import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export interface RatingButtonProps {
  initialValue?: number;
  onClick: (rating: number) => void;
  iconSize?: number;
}

const RatingButton: React.FC<RatingButtonProps> = ({
  initialValue,
  onClick,
  iconSize = 32,
}) => {
  const clampedInitialValue = initialValue
    ? Math.min(Math.max(initialValue, 0), 5)
    : 0;

  const [rating, setRating] = useState(clampedInitialValue);
  const [hover, setHover] = useState(clampedInitialValue);

  const renderStar = (value: number) => {
    if (hover >= value) {
      return <FaStar size={iconSize} />;
    }

    return <FaRegStar size={iconSize} />;
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <button
            key={value}
            type="button"
            className="text-teal-500 cursor-pointer px-1 flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault();

              setRating(value);
              onClick(value);
            }}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(rating)}
          >
            {renderStar(value)}
          </button>
        );
      })}
    </div>
  );
};

export default RatingButton;
