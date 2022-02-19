import React from "react";

import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import BlockContent from "@sanity/block-content-to-react";

import Rating from "components/Rating";

import { getClient } from "lib/sanity.server";
import serializer from "lib/serializer";

import { RecipeDetails } from "schema/extra";

export interface RecipeDetailsProps {
  recipe: RecipeDetails;

  favorite: boolean;
  onFavorite: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipe,
  favorite,
  onFavorite,
}) => {
  const imageProps = useNextSanityImage(getClient(), recipe.image, {
    imageBuilder: (builder, _options) => {
      return builder.width(1920).height(1920).fit("crop").crop("focalpoint");
    },
  });

  return (
    <div>
      <section className="mb-3">
        <div className="container mx-auto">
          <Image {...imageProps} alt={recipe.name} />
        </div>
      </section>

      <section className="mb-3 px-3 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Left side (narrow) */}
            <div className="min-w-[16rem] flex flex-col gap-3 order-last md:order-first">
              {/* Buttons */}
              <div className="bg-white rounded-5 p-6 flex md:flex-col justify-around gap-3">
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
                  <button
                    type="button"
                    className={
                      favorite
                        ? `bg-gray-300 hover:bg-teal-700 transition-colors text-teal-500 hover:text-gray-200 rounded-5 w-16 h-16 flex justify-center items-center`
                        : `bg-teal-500 hover:bg-teal-700 transition-colors text-white rounded-5 w-16 h-16 flex justify-center items-center`
                    }
                    onClick={onFavorite}
                  >
                    {favorite ? (
                      <FaHeart size={24} />
                    ) : (
                      <FaRegHeart size={24} />
                    )}
                  </button>
                  <div className="flex flex-col">
                    <span className="font-semibold">Lagre</span>
                    {favorite && (
                      <span className="hidden md:block">
                        <small>Trykk for å fjerne fra favoritter</small>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-white rounded-5 p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-center mb-3">
                  Ingredienser
                </h2>

                <ul className="list-none pt-5 flex flex-col gap-3 border-t border-t-gray-300">
                  {recipe.ingredients?.map((item) => (
                    <li key={item.ingredient?._id} className="font-semibold">
                      <span data-amount={item.amount}>{`${item.amount} `}</span>
                      <span data-unit={item.unit}>{`${item.unit} `}</span>
                      <span>{item.ingredient?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side (main content) */}
            <div className="flex-auto flex flex-col gap-3">
              {/* Main Content (Recipe) */}
              <div className="bg-white rounded-5 p-6">
                {/* Recipe Title */}
                <h1 className="text-6xl font-semibold uppercase text-center mb-5 mt-5">
                  {recipe.name}
                </h1>

                {/* Rating & Comments count */}
                <div className="flex justify-center items-center gap-5 mb-5">
                  {/* Open modal to rate recipe */}
                  <button
                    type="button"
                    className="text-lg font-semibold flex items-center gap-1"
                    onClick={() => {
                      console.log("TODO: Implement Rating Modal");
                    }}
                  >
                    <Rating size={18} />
                    <span className="leading-none">
                      {`(${recipe.ratings?.length || 0})`}
                    </span>
                  </button>

                  {/* TODO: Implement comments to backend */}
                  {/* Scroll down to comment section */}
                  {/* <a href="#comments"></a> */}
                </div>

                {/* Instructions */}
                <BlockContent
                  blocks={recipe.instructions || []}
                  serializers={serializer}
                />

                {/* Rate recipe (5 start clickable) */}
                {/* TODO: Create this component */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
