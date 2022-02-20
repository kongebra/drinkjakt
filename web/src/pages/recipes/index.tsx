import RecipeCard from "components/RecipeCard";
import { PageData } from "models/page-data";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RecipeDetails } from "schema";

const RecipesPage = () => {
  const router = useRouter();

  const [pageData, setPageData] = useState<
    PageData<RecipeDetails> | undefined
  >();

  const currentPage = useMemo(() => {
    if (pageData) {
      if (pageData.pagination.offset && pageData.pagination.limit) {
        return pageData.pagination.offset / pageData.pagination.limit;
      }
    }

    return 1;
  }, [pageData]);
  const totalPages = useMemo(() => {
    if (pageData && pageData.pagination.total && pageData.pagination.limit) {
      return pageData.pagination.total / pageData.pagination.limit;
    }

    return 1;
  }, [pageData]);

  const [recipes, setRecipes] = useState<Array<RecipeDetails>>([]);

  const fetchData = useCallback(() => {
    fetch("/api/recipes/search?limit=3")
      .then((res) => res.json())
      .then((data: PageData<RecipeDetails>) => {
        setPageData(data);
        setRecipes(data.data);
      })
      .catch(() => {});
  }, []);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-0 gap-5">
              {recipes.map((recipe) => {
                return <RecipeCard key={recipe._id} recipe={recipe} />;
              })}
            </div>

            <div className="flex justify-center gap-3">
              {pageData?.links.prev && (
                <Link href={pageData?.links.prev}>
                  <a>{"<"}</a>
                </Link>
              )}
              <span>{`Side ${currentPage} av ${totalPages}`}</span>
              {pageData?.links.next && (
                <Link href={pageData?.links.next}>
                  <a>{">"}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
