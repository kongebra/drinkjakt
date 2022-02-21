import { getClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { Rating } from "schema";
import { useAppUser } from "./use-app-user";

export function useRatings() {
  const { user } = useAppUser();

  const fetchRatings = async (recipeId: string): Promise<Array<Rating>> => {
    const query = groq`*[_type == "rating" && recipe._ref == $recipeId]`;
    const result = await getClient().fetch<Array<Rating>>(query, { recipeId });

    return result;
  };

  const rateRecipe = (recipeId: string, rating: number) => {
    if (user) {
      return fetch("/api/recipes/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipeId,
          userId: user._id,
          rating,
        }),
      });
    }

    return undefined;
  };

  const myRating = async (recipeId: string): Promise<number> => {
    if (user) {
      const query = groq`*[_type == "rating" && recipe._ref == $recipeId && user._ref == $userId][0]`;
      const result = await getClient().fetch<Rating>(query, {
        recipeId,
        userId: user._id,
      });

      if (result) {
        return result.rating;
      }
    }

    return 0;
  };

  return { fetchRatings, rateRecipe, myRating };
}
