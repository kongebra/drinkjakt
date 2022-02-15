import { FC, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  FrontpageWithRecipes,
  SanityKeyedReference,
  Recipe,
} from "@studio/schema";

import { useAppUser } from "hooks/use-app-user";

import RecipeCard from "./RecipeCard";
import FeatureCard from "./FeatureCard";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";

interface Props {
  frontpage: FrontpageWithRecipes;
}

type FavoriteResponse = {
  message: string;
  removed?: boolean;
  inserted?: SanityKeyedReference<Recipe>;
};

const FeaturedRecipes: FC<Props> = ({ frontpage }) => {
  const router = useRouter();

  const { user } = useAppUser();

  const [favorites, setFavorites] = useState<Array<string>>(
    (user && user.favorites && user.favorites.map((x) => x._ref)) || []
  );
  const addFavorite = (id: string) => setFavorites((prev) => [...prev, id]);
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((x) => x !== id));
  };
  const isFavorite = (id: string) => favorites.some((x) => x === id);

  useEffect(() => {
    if (user?.favorites && favorites.length === 0) {
      setFavorites(user.favorites.map((x) => x._ref));
    }
  }, [user]);

  const handleOnClickFavorite = (recipe: Recipe, favorite: boolean) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (favorite) {
      addFavorite(recipe._id);
      toast(`❤️ ${recipe.name} added to favorites!`);
    } else {
      removeFavorite(recipe._id);
      toast(`❌ ${recipe.name} removed from favorites!`);
    }

    fetch("/api/profile/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        recipeId: recipe._id,
        favorite: favorite,
      }),
    }).catch(() => {
      // error happend,
      if (favorite) {
        removeFavorite(recipe._id);
        toast.error(`Could favorite recipe: ${recipe.name}.`);
      } else {
        addFavorite(recipe._id);
        toast.error(`Could not remove favorite from recipe: ${recipe.name}.`);
      }
    });
  };

  return (
    <section className="py-3">
      <div className="container">
        <div className="row">
          <h1 className="text-center mb-5">Fremhevet oppskrifter</h1>

          {frontpage.recipes?.map((recipe) => (
            <div key={recipe._id} className="col">
              <div className="position-relative">
                <FeatureCard recipe={recipe} />
                <FavoriteButton
                  active={isFavorite(recipe._id)}
                  onClick={() =>
                    handleOnClickFavorite(recipe, !isFavorite(recipe._id))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
