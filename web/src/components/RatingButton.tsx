import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export interface RatingButtonProps {
  initialValue?: number;
  onClick: (rating: number) => void;
  count?: number;
  showCount?: boolean;
}

const RatingButton: React.FC<RatingButtonProps> = ({
  initialValue = 0,
  onClick,
  count,
  showCount,
}) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(initialValue);

  useEffect(() => {
    setRating(initialValue);
    setHover(initialValue);
  }, [initialValue]);

  const renderStar = (value: number) => {
    if (hover >= value) {
      return <FaStar className="text-3xl" />;
    }

    return <FaRegStar className="text-3xl" />;
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => {
          return (
            <button
              key={value}
              type="button"
              className="text-amber-500 cursor-pointer px-1 flex justify-center items-center"
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
      {showCount && count !== undefined && (
        <span className="text-xl font-light text-slate-800">({count})</span>
      )}
    </div>
  );
};

export default RatingButton;
