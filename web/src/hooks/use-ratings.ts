import { useCallback, useEffect, useState } from "react";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { Rating } from "schema";

import { useAppUser } from "./use-app-user";

export function useRatings(recipeId: string) {
  const { user } = useAppUser();

  const [refetchData, setRefetchData] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);

  const fetchMyRating = useCallback(async (): Promise<number> => {
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
  }, [recipeId, user]);

  const fetchRatings = useCallback(async (): Promise<Array<Rating>> => {
    const query = groq`*[_type == "rating" && recipe._ref == $recipeId]`;
    const result = await getClient().fetch<Array<Rating>>(query, { recipeId });

    return result;
  }, [recipeId]);

  const fetchData = useCallback(() => {
    fetchMyRating().then(setUserRating);
    fetchRatings().then((ratings) => {
      const len = ratings.length;
      const divider = len || 1;
      const sum = ratings.reduce((prev, curr) => prev + curr.rating, 0);

      setCount(len);
      setRating(sum / divider);
    });
  }, [fetchMyRating, fetchRatings]);

  useEffect(() => {
    if (user) {
      console.log("if user");
      fetchData();
    }
  }, [fetchData, user]);

  useEffect(() => {
    if (refetchData) {
      console.log("if refetchData");
      fetchData();
      setRefetchData(false);
    }
  }, [fetchData, refetchData]);

  const rateRecipe = (rating: number) => {
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
      }).then(() => {
        setRefetchData(true);
      });
    }

    return undefined;
  };

  return { rating, count, userRating, rateRecipe };
}
