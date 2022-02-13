import { FC, useEffect, useState } from "react";
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

interface Props {
  frontpage: FrontpageWithRecipes;
}

type FavoriteResponse = {
  message: string;
  removed?: boolean;
  inserted?: SanityKeyedReference<Recipe>;
};

const FeaturedRecipes: FC<Props> = ({ frontpage }) => {
  const { user } = useAppUser();

  const [favorites, setFavorites] = useState<
    Array<SanityKeyedReference<Recipe>>
  >(user?.favorites || []);

  useEffect(() => {
    setFavorites(user?.favorites || []);
  }, [user?.favorites?.length]);

  const handleOnClickFavorite = (recipe: Recipe) => {
    if (!user) {
      // TODO: Send user to login page
      return;
    }

    fetch("/api/profile/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        recipeId: recipe._id,
      }),
    })
      .then((res) => res.json())
      .then((data: FavoriteResponse) => {
        console.log({ data });

        if (data.inserted) {
          setFavorites((prevValue) => [...prevValue, data.inserted!]);

          toast(`❤️ ${recipe.name} added to favorites!`);
        } else {
          setFavorites((prevValue) =>
            prevValue.filter((x) => x._ref !== recipe._id)
          );

          toast(`❌ ${recipe.name} removed from favorites!`);
        }
      })
      .catch(() => {
        toast.error(`Could not favorite/unfavorite ${recipe.name}.`);
      });
  };

  return (
    <section className="py-3">
      <div className="container">
        <div className="row">
          <h1 className="text-center mb-5">Featured Recipes</h1>

          {frontpage.recipes?.map((recipe) => (
            <div key={recipe._id} className="col">
              <div className="position-relative">
                <FeatureCard recipe={recipe} />
                <FavoriteButton
                  active={favorites.some((x) => x._ref === recipe._id)}
                  onClick={() => handleOnClickFavorite(recipe)}
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
