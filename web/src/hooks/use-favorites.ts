import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";

import { useAppUser } from "./use-app-user";

import { queryClient } from "lib/client";

export function useFavorites() {
  const { user } = useAppUser();

  const favorites = useMemo(
    () => user?.favorites?.map((x) => x._ref) || [],
    [user?.favorites]
  );

  const isFavorite = useCallback(
    (recipeId: string): boolean => {
      return favorites.some((fav) => fav === recipeId);
    },
    [favorites]
  );

  const mutation = useMutation(
    (args: { userId: string; recipeId: string; favorite: boolean }) => {
      return fetch("/api/profile/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appUser");
      },
    }
  );

  function addFavorite(recipeId: string) {
    if (user && !isFavorite(recipeId)) {
      mutation.mutate({ userId: user._id, recipeId: recipeId, favorite: true });
    }
  }

  function removeFavorite(recipeId: string) {
    if (user && isFavorite(recipeId)) {
      mutation.mutate({
        userId: user._id,
        recipeId: recipeId,
        favorite: false,
      });
    }
  }

  function toggleFavorite(recipeId: string) {
    if (user) {
      if (isFavorite(recipeId)) {
        removeFavorite(recipeId);
      } else {
        addFavorite(recipeId);
      }
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
