import React, { useCallback, useEffect } from "react";

import Head from "next/head";

import RecipeCard from "components/RecipeCard";

import { PageData } from "models/page-data";

import { RecipeDetails } from "schema";

import { usePagination, useFavorites } from "hooks";

import SimplePagination from "components/SimplePagination";

const RecipesPage = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const pagination = usePagination<RecipeDetails>({
    initialPageSize: 9,
  });

  const setData = pagination.setData;

  const fetchData = useCallback(() => {
    console.log("fetch data");
    // TODO: When we get MANY recipes, we maybe need to do some server-side pagination
    fetch(`/api/recipes/search`)
      .then((res) => res.json())
      .then((data: PageData<RecipeDetails>) => {
        setData(data.data);
      })
      .catch(() => {});
  }, [setData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Head>
        <title>Søk i oppskrifter | DrinkJakt</title>
      </Head>
      <div className="container mx-auto py-5">
        <h1 className="text-5xl mb-10">Oppskrifter</h1>

        <div className="flex gap-5">
          {/* SEARCH AND FILTERS (TBA) */}
          {/* <div className="min-w-[24rem]">
          <input type="search" placeholder="Søk i oppskrifter" />
          </div> */}

          <div className="grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-0 gap-5 mb-5">
              {pagination.page.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    favorite={isFavorite(recipe)}
                    onClickFavorite={() => {
                      toggleFavorite(recipe);
                    }}
                  />
                );
              })}
            </div>

            <SimplePagination {...pagination} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
