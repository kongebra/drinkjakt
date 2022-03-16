import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { FeaturedRecipeDto } from "queries";

import { useRatings, useFavorites } from "hooks";

import { getClient } from "lib/sanity.server";

import RatingButton from "./RatingButton";
import FavoriteHeart from "./FavoriteHeart";

const FrontpageRecipe = ({ recipe }: { recipe: FeaturedRecipeDto }) => {
  const { rating, count, rateRecipe } = useRatings(recipe._id);
  const { isFavorite, toggleFavorite } = useFavorites();

  const IMAGE_SIZE = 1024;
  const imageProps = useNextSanityImage(getClient(), recipe.image, {
    imageBuilder: (builder, _options) => {
      return builder
        .width(IMAGE_SIZE)
        .height(IMAGE_SIZE)
        .fit("crop")
        .crop("focalpoint");
    },
  });

  return (
    <>
      <div
        key={recipe._id}
        className="flex flex-col gap-2 md:gap-4 p-4 bg-white rounded-xl"
      >
        <div className="block flex-1 max-w-full max-h-fit">
          <Link href={`/recipes/${recipe.slug}`}>
            <a>
              <Image
                {...imageProps}
                alt={recipe.name}
                className="rounded-xl"
                layout="responsive"
                unoptimized
              />
            </a>
          </Link>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{recipe.name}</h2>
          </div>

          <div className="flex justify-between">
            <RatingButton
              className="text-2xl"
              countClassName=""
              initialValue={rating}
              count={count}
              showCount
              onClick={rateRecipe}
            />

            <FavoriteHeart
              className="text-4xl"
              active={isFavorite(recipe._id)}
              onClick={(e) => {
                e.preventDefault();

                toggleFavorite(recipe._id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontpageRecipe;
