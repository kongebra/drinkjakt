import React, { useMemo } from "react";
import {
  FaHeart,
  FaListUl,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

import { useNextSanityImage } from "next-sanity-image";

import { RecipeDetails } from "schema";

import clsx from "clsx";

import { getClient } from "lib/sanity.server";

export interface RecipeCardProps {
  recipe: RecipeDetails;

  highRes?: boolean;

  favorite?: boolean;
  onClickFavorite?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,

  highRes,

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
  }, [recipe.ratings]);

  const renderRating = () => {
    if (recipe.ratings) {
      return (
        <div className={`flex gap-1 text-teal-500 mb-2`}>
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
        className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer mb-3 relative group"
      >
        <div className="max-h-64 relative overflow-hidden">
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
            className={`text-lg font-bold mb-3 group-hover:text-teal-500 group-hover:underline transition-all`}
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

        <div className="absolute top-0 right-4 h-12 w-10 bg-white rounded-b-xl flex justify-center items-end pb-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClickFavorite && onClickFavorite();
            }}
            className="bg-none border-none p-0 m-0"
            title={favorite ? `Fjern fra favoritter` : `Legg til i favoritter`}
            aria-label={
              favorite ? `Fjern fra favoritter` : `Legg til i favoritter`
            }
          >
            <FaHeart
              size={24}
              className={clsx(
                favorite
                  ? "fill-red-500 hover:fill-red-900"
                  : "fill-slate-300 hover:fill-slate-400",
                "transition-colors"
              )}
            />
          </button>
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
