import { useState, useCallback, useEffect, useMemo } from "react";
import { RecipeDetails, User } from "schema";

import { useAppUser } from "./use-app-user";

export function useFavorites() {
  const { user: appUser } = useAppUser();

  const [user, setUser] = useState<User | undefined>(appUser);

  useEffect(() => {
    setUser(appUser);
  }, [appUser]);

  const favorites = useMemo(
    () => user?.favorites?.map((x) => x._ref) || [],
    [user?.favorites]
  );

  const addFavorite = (recipe: RecipeDetails) => {
    if (user && !isFavorite(recipe)) {
      fetch("/api/profile/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          recipeId: recipe._id,
          favorite: true,
        }),
      });
    }
  };

  const removeFavorite = (recipe: RecipeDetails) => {
    if (user && isFavorite(recipe)) {
      fetch("/api/profile/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          recipeId: recipe._id,
          favorite: false,
        }),
      });
    }
  };

  const toggleFavorite = (recipe: RecipeDetails) => {
    if (user) {
      if (isFavorite(recipe)) {
        removeFavorite(recipe);
      } else {
        addFavorite(recipe);
      }
    }
  };

  const isFavorite = useCallback(
    (recipe: RecipeDetails): boolean => {
      return favorites.some((fav) => fav === recipe._id);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
