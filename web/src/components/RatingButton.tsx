import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface RatingButtonProps {
  initialValue?: number;
  onClick: (rating: number) => void;
  count?: number;
  showCount?: boolean;
  className?: string;
  countClassName?: string;
}

const RatingButton: React.FC<RatingButtonProps> = ({
  initialValue = 0,
  onClick,
  count,
  showCount,
  className,
  countClassName,
}) => {
  const iconClassName = clsx("text-3xl", className);

  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(initialValue);

  useEffect(() => {
    setRating(initialValue);
    setHover(initialValue);
  }, [initialValue]);

  const renderStar = (value: number) => {
    let Icon: IconType = FaRegStar;

    if (hover >= value) {
      Icon = FaStar;
    }

    return <Icon className={iconClassName} />;
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
        <span
          className={clsx("text-xl font-light text-slate-800", countClassName)}
        >
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingButton;
