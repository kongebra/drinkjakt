import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import BlockContent from "@sanity/block-content-to-react";

import Rating from "components/Rating";
import RecipeRatingButtonModal from "components/RecipeRatingButtonModal";

import { getClient } from "lib/sanity.server";
import serializer from "lib/serializer";

import { RecipeDetails } from "schema/extra";
import { useRatings } from "hooks";

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
  const { fetchRatings, myRating } = useRatings();

  const imageProps = useNextSanityImage(getClient(), recipe.image, {
    imageBuilder: (builder, _options) => {
      return builder.width(1920).height(1920).fit("crop").crop("focalpoint");
    },
  });

  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const fetchRatingData = () => {
    fetchRatings(recipe._id).then((ratings) => {
      const len = ratings.length || 1;
      const sum = ratings.reduce((prev, curr) => prev + curr.rating, 0);

      setRating(sum / len);
      setRatingCount(len);
    });

    myRating(recipe._id).then(setUserRating);
  };

  useEffect(() => {
    fetchRatingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className="mb-3">
        <div className="container mx-auto">
          <Image {...imageProps} alt={recipe.name} unoptimized />
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
                      {item.amount && (
                        <span
                          data-amount={item.amount}
                        >{`${item.amount} `}</span>
                      )}
                      {item.unit && (
                        <span data-unit={item.unit}>{`${item.unit} `}</span>
                      )}
                      <span>{item.ingredient?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side (main content) */}
            <div className="flex-auto flex flex-col gap-3">
              {/* Main Content (Recipe) */}
              <div className="bg-white rounded-5 px-6 py-10">
                {/* Recipe Title */}
                <h1 className="text-6xl font-semibold uppercase text-center mb-5">
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
                    <Rating size={18} rating={rating} />
                    <span className="leading-none">{`(${ratingCount})`}</span>
                  </button>

                  {/* TODO: Implement comments to backend */}
                  {/* Scroll down to comment section */}
                  {/* <a href="#comments"></a> */}
                </div>

                {/* Instructions */}
                <BlockContent
                  blocks={recipe.instructions || []}
                  serializers={serializer}
                  className="mb-5"
                />

                <div className="py-5">
                  <hr />
                </div>

                {/* Rate recipe */}
                <div className="flex flex-col items-center gap-2 pt-5">
                  <h2 className="text-lg uppercase font-semibold">
                    Vurder oppskriften
                  </h2>
                  {userRating !== 0 && (
                    <p className="text-gray-700">
                      Vil du ombestemme deg? GI en ny vurdering!
                    </p>
                  )}
                  <RecipeRatingButtonModal
                    recipe={recipe}
                    onRating={fetchRatingData}
                    initialRating={userRating}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
