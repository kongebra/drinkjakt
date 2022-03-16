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
  const { rating, count } = useRatings(recipe._id);
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
        className="flex flex-col md:flex-row gap-2 md:gap-4 p-4 bg-white rounded-xl"
      >
        <div className="block flex-1 md:max-w-[8rem] md:max-h-[8rem] lg:max-w-[16rem] lg:max-h-[16rem]">
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

        <div className="flex justify-between flex-1">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h2 className="text-2xl lg:text-4xl font-semibold">
              {recipe.name}
            </h2>
            <RatingButton
              className="md:text-2xl lg:text-4xl"
              countClassName="lg:text-2xl"
              initialValue={rating}
              count={count}
              showCount
              onClick={(rating) => {
                console.log("set rating", { rating, name: recipe.name });
              }}
            />
          </div>

          <div className="flex items-center md:pr-8">
            <FavoriteHeart
              className="text-5xl"
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
