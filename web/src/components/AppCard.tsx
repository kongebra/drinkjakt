import React, { useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import type { UseNextSanityImageProps } from "next-sanity-image";

import {
  FaListUl,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { formatDifficulty } from "utils";

export interface AppCardProps {
  title: string;
  href: string;
  imageProps: Required<UseNextSanityImageProps> & {
    placeholder: "blur";
  };

  rating?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  ingredients: Array<string>;

  tall?: boolean;
  color?: "white" | "teal";
}

const AppCard: React.FC<AppCardProps> = ({
  href,
  title,
  imageProps,
  rating,
  difficulty,
  ingredients,
  tall,
  color = "white",
}) => {
  const colors = useMemo(() => {
    if (color === "teal") {
      return {
        bg: "bg-teal-500",
        color: "text-white",
        hoverColor: "text-white",
        alternativeColor: "text-white",
      };
    }

    return {
      bg: "bg-white",
      color: "text-black",
      hoverColor: "text-teal-500",
      alternativeColor: "text-gray-700",
    };
  }, [color]);

  const renderRating = () => {
    if (rating) {
      return (
        <div className={`flex gap-1 ${colors.hoverColor} mb-2`}>
          {[0, 1, 2, 3, 4].map((value) => {
            const roundedRating = Math.round(rating * 2) / 2;

            if (roundedRating - value >= 1) {
              return <FaStar key={value} />;
            }

            if (roundedRating - value === 0.5) {
              return <FaStarHalfAlt key={value} />;
            }

            return <FaRegStar key={value} />;
          })}
        </div>
      );
    }

    return null;
  };
  return (
    <Link href={href}>
      <a
        className={`${colors.bg} ${colors.color} rounded shadow overflow-hidden cursor-pointer group`}
        title={title}
      >
        <div className="max-h-40 relative overflow-hidden">
          <Image
            {...imageProps}
            alt={title}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="p-3">
          {renderRating()}

          <h2
            className={`text-lg font-bold mb-3 group-hover:${colors.hoverColor} group-hover:underline`}
          >
            {title}
          </h2>

          <dl
            className={`flex flex-wrap gap-3 mb-0 text-sm font-light ${colors.alternativeColor} group-hover:${colors.alternativeColor}`}
          >
            <dd className="flex gap-1 align-items-center">
              <FaTachometerAlt />
              <span className="leading-none">
                {formatDifficulty(difficulty, true)}
              </span>
            </dd>

            <dd className="flex gap-1 align-items-center">
              <FaListUl />
              <span className="leading-none">
                {ingredients.length} ingredienser
              </span>
            </dd>

            {ingredients.map((ingredient) => (
              <dt className="hidden">{ingredient}</dt>
            ))}
          </dl>
        </div>
      </a>
    </Link>
  );
};

export default AppCard;
