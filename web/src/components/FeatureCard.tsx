import React from "react";

import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { GiCook } from "react-icons/gi";
import { FaList } from "react-icons/fa";

import { getClient } from "lib/sanity.server";

import { RecipeWithRatings } from "@studio/schema";

import Rating from "./RatingStars";

export interface FeatureCardProps {
  recipe: RecipeWithRatings;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ recipe }) => {
  const WIDTH = 220;
  const HEIGHT = 165;

  const imageProps = useNextSanityImage(getClient(), recipe.image!, {
    imageBuilder: (builder, options) => {
      return builder
        .width(WIDTH * 10)
        .height(HEIGHT * 10)
        .fit("clip")
        .quality(options.quality || 100);
    },
  });

  const formatDifficulty = (
    difficulty: "beginner" | "intermediate" | "advanced" | string
  ) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <a
      href={`/recipes/${recipe.slug?.current}`}
      className="feature-card"
      title={recipe.name}
    >
      <div className="feature-card__image-wrapper">
        <Image
          {...imageProps}
          alt={recipe.name}
          layout="responsive"
          objectFit="cover"
          unoptimized
        />
      </div>

      <div className="feature-card__info">
        <div className="mb-2">
          <Rating ratings={recipe.ratings} />
        </div>

        <h2 className="feature-card__header">{recipe.name}</h2>

        <dl className="feature-card__description">
          {recipe.difficulty && (
            <dd className="mb-0 d-flex gap-1 justify-content-center align-items-center">
              <GiCook />
              {formatDifficulty(recipe.difficulty)}
            </dd>
          )}

          {recipe?.ingredients && (
            <dd className="mb-0 d-flex gap-1 justify-content-center align-items-center">
              <FaList />
              {recipe.ingredients.length} ingredients
            </dd>
          )}
        </dl>
      </div>
    </a>
  );
};

export default FeatureCard;
