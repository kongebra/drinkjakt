import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { groq } from "next-sanity";

import { queryClient } from "lib/client";
import { getClient } from "lib/sanity.server";

import { Rating } from "schema";

import { useAppUser } from "./use-app-user";

export function useRatings(recipeId: string) {
  const { user: appUser } = useAppUser();

  const [client] = useState(getClient());
  const { data: ratingData } = useQuery(["rating", recipeId], () =>
    client.fetch<Array<Rating>>(
      groq`*[_type == "rating" && recipe._ref == $recipeId]`,
      {
        recipeId,
      }
    )
  );

  const { data: userRatingData } = useQuery(
    ["userRating", recipeId],
    () =>
      client.fetch<Rating>(
        groq`*[_type == "rating" && recipe._ref == $recipeId && user._ref == $userId][0]`,
        {
          recipeId,
          userId: appUser?._id,
        }
      ),
    {
      enabled: !!appUser,
    }
  );

  const mutation = useMutation(
    ({ userId, rating }: { userId: string; rating: number }) => {
      return fetch("/api/recipes/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipeId,
          userId,
          rating,
        }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["rating", recipeId]);
        queryClient.invalidateQueries(["userRating", recipeId]);
      },
    }
  );

  const rateRecipe = (rating: number) => {
    if (appUser && !mutation.isLoading) {
      mutation.mutate({ userId: appUser._id, rating });
    }
  };

  const [rating, count] = useMemo(() => {
    const sum = ratingData?.reduce((acc, curr) => acc + curr.rating, 0);
    const len = ratingData?.length;

    if (sum && len) {
      const score = sum / len;
      return [score, len];
    }

    return [0, 0];
  }, [ratingData]);

  return { rating, count, userRating: userRatingData?.rating, rateRecipe };
}
