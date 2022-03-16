import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { FeaturedRecipeDto } from "queries";

import { useRatings, useFavorites, useAppUser } from "hooks";

import { getClient } from "lib/sanity.server";

import RatingButton from "./RatingButton";
import FavoriteHeart from "./FavoriteHeart";
import { useBoolean } from "usehooks-ts";
import Modal from "./Modal";
import Button from "./Button";
import { useRouter } from "next/router";

const FrontpageRecipe = ({ recipe }: { recipe: FeaturedRecipeDto }) => {
  const router = useRouter();
  const { user } = useAppUser();
  const { rating, count, rateRecipe } = useRatings(recipe._id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { value: showLoginModal, setTrue, setFalse } = useBoolean();
  const imageProps = useNextSanityImage(getClient(), recipe.image, {
    imageBuilder: (builder, _options) => {
      return builder.width(1024).height(1024).fit("crop").crop("focalpoint");
    },
  });

  const handleOnClickFavorite = () => {
    if (!user) {
      setTrue();
      return;
    }

    toggleFavorite(recipe._id);
  };
  const handleOnClickRating = (rating: number) => {
    if (!user) {
      setTrue();
      return;
    }

    rateRecipe(rating);
  };

  return (
    <>
      <div
        key={recipe._id}
        className="flex flex-col gap-2 md:gap-4 p-4 bg-white rounded-xl"
      >
        <div className="block flex-1 max-w-full max-h-fit">
          <Link href={`/recipes/${recipe.slug}`}>
            <a className="block overflow-hidden rounded-xl">
              <Image
                {...imageProps}
                alt={recipe.name}
                className="hover:scale-105 transition-transform duration-300"
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
              onClick={handleOnClickRating}
            />

            <FavoriteHeart
              className="text-4xl"
              active={isFavorite(recipe._id)}
              onClick={handleOnClickFavorite}
            />
          </div>
        </div>
      </div>

      <Modal open={showLoginModal} onClose={setFalse}>
        <div className="flex flex-col justify-center gap-8">
          <h2 className="text-xl">
            Logg inn for å gi oppskrifter rating, eller legge de til som
            favoritter!
          </h2>

          <Button
            onClick={() => {
              setFalse();
              router.push("/api/auth/login");
            }}
          >
            Logg inn
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FrontpageRecipe;
