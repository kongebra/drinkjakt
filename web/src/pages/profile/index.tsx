import React, { useCallback, useEffect, useState } from "react";

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { groq } from "next-sanity";

import { useAppUser } from "hooks";

import { NavItem } from "layouts/Navbar/Navbar";

import ProfileTabs from "components/ProfileTabs";

import { getClient } from "lib/sanity.server";

import { RecipeDetails, UserWithFavorites } from "schema";
import RecipeCard from "components/RecipeCard";

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
  const navItems: Array<NavItem> = [
    {
      href: "/profile",
      text: "Mine favoritter",
    },
    {
      href: "/profile/settings",
      text: "Profil",
    },
  ];

  const { user, isLoading } = useAppUser();

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

  if (isLoading) {
    return null;
  }

  if (user === undefined) {
    return (
      <div className="container mx-auto">
        <Link href="/api/auth/login">
          <a>Logg Inn</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="flex justify-center items-center gap-10">
        <Image
          src={user.picture || ""}
          alt={`${user.firstName} ${user.lastName}`}
          width={150}
          height={150}
          className="rounded-full"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold">
            Hei, <span className="text-teal-500">{user.firstName}!</span>
          </h2>

          <Link href="/api/auth/logout">
            <a className="text-lg underline hover:text-teal-500 hover:no-underline">
              Logg ut
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col pt-5">
        <ProfileTabs navItems={navItems} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              favorite={true}
              onClickFavorite={() => {
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
                  setFavorites((prev) =>
                    prev.filter((x) => x._id !== recipe._id)
                  );
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
