import { Recipe, RecipeDetails } from "@studio/schema";
import { getClient } from "lib/sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

import {
  FaHeart,
  FaListUl,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { formatDifficulty } from "utils";
import FavoriteButton from "./FavoriteButton";

export interface RecipeCardProps {
  recipe: RecipeDetails;

  highRes?: boolean;

  showFavorite?: boolean;
  favorite?: boolean;
  onClickFavorite?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,

  highRes,

  showFavorite,
  favorite,
  onClickFavorite,
}) => {
  const imageSize = highRes ? 2048 : 512;

  const imageProps = useNextSanityImage(getClient(), recipe.image!, {
    imageBuilder: (builder, options) => {
      return builder
        .width(imageSize)
        .height(imageSize)
        .fit("clip")
        .quality(options.quality || highRes ? 100 : 75);
    },
  });

  const rating = useMemo(() => {
    if (recipe.ratings) {
      const sum = recipe.ratings?.reduce(
        (prev, curr) => prev + (curr.rating || 0),
        0
      );

      return sum / recipe.ratings?.length;
    }

    return 0;
  }, [recipe.ratings?.length]);

  const renderRating = () => {
    if (recipe.ratings) {
      return (
        <div className={`flex gap-1 text-sky-500 mb-2`}>
          {[0, 1, 2, 3, 4].map((value) => {
            const key = `${recipe._id}_${value}`;

            const roundedRating = Math.round(rating * 2) / 2;

            if (roundedRating - value >= 1) {
              return <FaStar key={key} />;
            }

            if (roundedRating - value === 0.5) {
              return <FaStarHalfAlt key={key} />;
            }

            return <FaRegStar key={key} />;
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <Link href={`/recipes/${recipe?.slug?.current}`}>
      <a
        title={recipe.name}
        className="bg-white rounded shadow overflow-hidden cursor-pointer mb-3 group"
      >
        <div className="max-h-40 relative overflow-hidden">
          <Image
            {...imageProps}
            alt={recipe.name}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="p-3">
          {renderRating()}

          <h2
            className={`text-lg font-bold mb-3 group-hover:text-sky-500 group-hover:underline`}
          >
            {recipe.name}
          </h2>

          <dl className={`flex flex-wrap gap-3 mb-0 text-sm font-light `}>
            {/* <dd className="flex gap-1 align-items-center">
              <FaTachometerAlt />
              <span className="leading-none">
                {formatDifficulty(recipe.difficulty, true)}
              </span>
            </dd> */}

            <dd className="flex gap-1 align-items-center">
              <FaListUl />
              <span className="leading-none">
                {recipe.ingredients?.length || 0} ingredienser
              </span>
            </dd>

            {recipe.ingredients?.map((ingredient, index) => (
              <dt
                key={`${ingredient.ingredient?._id}_${index}`}
                className="hidden"
              >
                {ingredient.ingredient?.name}
              </dt>
            ))}
          </dl>
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
