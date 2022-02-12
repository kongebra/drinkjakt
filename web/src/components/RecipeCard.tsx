import { Recipe } from "@studio/schema";
import { getClient } from "lib/sanity.server";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import React from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton";

export interface RecipeCardProps {
  recipe: Recipe;

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

  return (
    <div className="card mb-3">
      <div className="card-img-top position-relative">
        <Image {...imageProps} layout="responsive" unoptimized />

        {showFavorite && (
          <div
            className="position-absolute"
            style={{
              top: "1rem",
              right: "1rem",
            }}
          >
            <FavoriteButton
              active={favorite}
              onClick={onClickFavorite && onClickFavorite}
            />
          </div>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">{recipe.name}</h5>
      </div>
    </div>
  );
};

export default RecipeCard;
