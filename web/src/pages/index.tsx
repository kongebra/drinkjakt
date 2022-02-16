import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { FrontpageWithRecipes } from "@studio/schema";

import RecipeCard from "components/RecipeCard";
import { useAppUser } from "hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  frontpage: FrontpageWithRecipes;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  const { user } = useAppUser();

  const [favorites, setFavorites] = useState<Array<string>>(
    user?.favorites?.map((f) => f._ref) || []
  );
  const addFavorite = (recipeId: string) => {
    if (!isFavorite(recipeId)) {
      setFavorites((prevFavorites) => [...prevFavorites, recipeId]);
    }
  };

  const removeFavorite = (recipeId: string) => {
    if (isFavorite(recipeId)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((f) => f !== recipeId)
      );
    }
  };

  const isFavorite = useCallback(
    (recipeId: string): boolean => {
      return favorites.some((fav) => fav === recipeId);
    },
    [favorites]
  );

  useEffect(() => {
    if (user && user.favorites) {
      setFavorites(user.favorites.map((f) => f._ref));
    }
  }, [user?.favorites]);

  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>

      <section>
        <div className="container mx-auto pt-10 pb-5">
          <h1 className="text-6xl text-center font-bold mb-10">
            Fremhevde drinker
          </h1>

          <div className="grid grid-cols-5 gap-5">
            {frontpage.recipes?.map((recipe) => {
              const favorite = isFavorite(recipe._id);

              return (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  favorite={favorite}
                  onClickFavorite={() => {
                    if (user) {
                      if (favorite) {
                        removeFavorite(recipe._id);
                      } else {
                        addFavorite(recipe._id);
                      }

                      fetch("/api/profile/favorite", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userId: user._id,
                          recipeId: recipe._id,
                          favorite: !favorite,
                        }),
                      })
                        .then(() => {
                          if (favorite) {
                            toast.info(
                              `${recipe.name} fjernet fra favoritter!`
                            );
                          } else {
                            toast.success(
                              `${recipe.name} lagt til i favoritter!`
                            );
                          }
                        })
                        .catch(() => {
                          if (favorite) {
                            removeFavorite(recipe._id);
                          } else {
                            addFavorite(recipe._id);
                          }
                        });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto pt-10 pb-5">
          <h2 className="text-5xl text-center font-bold mb-10">
            Juicer & Sirup
          </h2>

          <div className="grid grid-cols-4 gap-5"></div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({
  preview = false,
}) => {
  const query = groq`*[_type == "frontpage"][0] {
    "recipes": featured_recipes[]->{
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
    },
  }`;

  const frontpage = await getClient(preview).fetch<FrontpageWithRecipes>(query);

  if (!frontpage) {
    return {
      notFound: true,
    };
  }

  if (Array.isArray(frontpage) && frontpage.length) {
    return {
      props: {
        frontpage: frontpage[0],
      },
    };
  }

  return {
    props: {
      frontpage,
    },
  };
};

export default Home;
