import React, { useCallback, useEffect, useState } from "react";

import { NextPage } from "next";

import { groq } from "next-sanity";

import { useAppUser } from "hooks";

import { getClient } from "lib/sanity.server";

import { RecipeDetails, UserWithFavorites } from "schema";

import RecipeCard from "components/RecipeCard";

import ProfileLayout from "layouts/ProfileLayout";

const query = groq`*[_type == "user" && auth0_sub == $sub][0] {
  "favorites": favorites[]->{
    _id,
    name,
    slug,
    difficulty,
    glass->{
      name,
      slug,
    },
    ice->{
      name,
      slug
    },
    image,
    ingredients[] {
      ingredient->{
        name,
        slug,
      },
      amount,
      unit
    },
    "ratings": *[_type == "rating" && recipe._ref == ^._id] {
      rating
    }
  }
}`;

const ProfilePage: NextPage = () => {
  const { user } = useAppUser();

  const [favorites, setFavorites] = useState<Array<RecipeDetails>>([]);

  const fetchData = useCallback(async () => {
    const result = await getClient().fetch<UserWithFavorites>(query, {
      sub: user?.auth0_sub,
    });

    if (result && result.favorites) {
      setFavorites(result.favorites);
    } else {
      setFavorites([]);
    }
  }, [user?.auth0_sub]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [fetchData, user]);

  const handleOnClickFavorite = (recipe: RecipeDetails) => {
    if (user) {
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
      }).then(() => {
        setFavorites((prev) => prev.filter((x) => x._id !== recipe._id));
      });
    }
  };

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            favorite={true}
            onClickFavorite={() => handleOnClickFavorite(recipe)}
          />
        ))}
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
