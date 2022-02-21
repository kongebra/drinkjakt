import React, { useState } from "react";

import { useBoolean } from "usehooks-ts";

import { useRatings } from "hooks";

import { RecipeDetails } from "schema";

import Modal from "./Modal";
import RatingButton from "./RatingButton";

export interface RecipeRatingButtonModalProps {
  initialRating?: number;
  recipe: RecipeDetails;

  onRating: () => void;
}

const RecipeRatingButtonModal: React.FC<RecipeRatingButtonModalProps> = ({
  initialRating,
  recipe,
  onRating,
}) => {
  const { rateRecipe } = useRatings();

  const [rating, setRating] = useState(initialRating || 0);

  const { value, setTrue, setFalse } = useBoolean(false);

  const handleOnClick = () => {
    rateRecipe(recipe._id, rating)?.then(() => {
      onRating();
      setFalse();
    });
  };

  return (
    <>
      <RatingButton
        initialValue={initialRating}
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
