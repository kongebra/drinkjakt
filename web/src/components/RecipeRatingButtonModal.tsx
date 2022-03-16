import React, { useState } from "react";

import { useBoolean } from "usehooks-ts";

import { useRatings } from "hooks";

import { RecipeDetails } from "schema";

import Modal from "./Modal";
import RatingButton from "./RatingButton";

export interface RecipeRatingButtonModalProps {
  recipe: RecipeDetails;
}

const RecipeRatingButtonModal: React.FC<RecipeRatingButtonModalProps> = ({
  recipe,
}) => {
  const { rateRecipe, userRating } = useRatings(recipe._id);

  const { value, setTrue, setFalse } = useBoolean(false);

  const [rating, setRating] = useState(0);

  const handleOnClick = () => {
    rateRecipe(rating);
    setFalse();
  };

  return (
    <>
      <RatingButton
        initialValue={userRating}
        onClick={(rating) => {
          setRating(rating);
          setTrue();
        }}
      />

      <Modal
        open={value}
        onClose={setFalse}
        title="Hvor mange stjerner vil du gi denne oppskriften?"
        textAlign="center"
      >
        <div className="flex flex-col items-center gap-10">
          <RatingButton initialValue={rating} onClick={setRating} />

          <button
            type="button"
            onClick={handleOnClick}
            className="border border-black hover:border-teal-500 hover:bg-teal-500 text-black hover:text-white px-10 py-2 rounded transition-all uppercase font-semibold"
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};

export default RecipeRatingButtonModal;
