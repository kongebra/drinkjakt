import { useState, useCallback, useEffect } from "react";
import { RecipeDetails } from "schema";

import { useAppUser } from "./use-app-user";

export function useFavorites() {
  const { user } = useAppUser();

  const [favorites, setFavorites] = useState<Array<string>>(
    user?.favorites?.map((f) => f._ref) || []
  );

  const addFavorite = (recipe: RecipeDetails) => {
    if (user && !isFavorite(recipe)) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe._id]);

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
      }).catch(() => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((f) => f !== recipe._id)
        );
      });
    }
  };

  const removeFavorite = (recipe: RecipeDetails) => {
    if (user && isFavorite(recipe)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((f) => f !== recipe._id)
      );

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
      }).catch(() => {
        setFavorites((prevFavorites) => [...prevFavorites, recipe._id]);
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

  useEffect(() => {
    if (user && user.favorites) {
      setFavorites(user.favorites.map((f) => f._ref));
    }
  }, [user, user?.favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
