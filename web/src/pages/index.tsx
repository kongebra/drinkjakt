import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { groq } from "next-sanity";

import type { FrontpageWithRecipes } from "schema";

import { getClient } from "lib/sanity.server";

import RecipeCard from "components/RecipeCard";

import { useFavorites } from "hooks";
import { useEffectOnce } from "usehooks-ts";
import { featuredRecipesQuery, FeaturedRecipesQueryResponse } from "queries";

interface Props {
  frontpage: FrontpageWithRecipes;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffectOnce(() => {
    getClient()
      .fetch<FeaturedRecipesQueryResponse>(featuredRecipesQuery)
      .then((data) => {
        console.table(data.featured_recipes);
      });
  });

  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>

      <section>
        <div className="container mx-auto pt-10 pb-5">
          <h1 className="text-6xl text-center font-bold mb-10">
            Fremhevede drinker
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-5 sm:px-0 gap-5">
            {frontpage.recipes?.slice(0, 4).map((recipe) => {
              const favorite = isFavorite(recipe);

              return (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  favorite={favorite}
                  onClickFavorite={() => {
                    toggleFavorite(recipe);
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
            {`Juicer & Sirup`}
          </h2>

          <div className="grid grid-cols-4 gap-5"></div>
        </div>
      </section>
    </>
  );
};

const query = groq`*[_type == "frontpage"][0] {
  "recipes": featured_recipes[]->{
    _id,
    name,
    slug,

    image,
    ingredients[] {
      ingredient->{
        name,
        slug,
      },
      amount,
      unit
    },

    glass->{
      name,
      slug,
    },
    ice->{
      name,
      slug
    },
    
    "ratings": *[_type == "rating" && recipe._ref == ^._id] {
      rating
    }
  },
}`;

export const getStaticProps: GetStaticProps<Props> = async ({
  preview = false,
}) => {
  const frontpage = await getClient(preview).fetch<FrontpageWithRecipes>(query);

  if (!frontpage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      frontpage,
    },
  };
};

export default Home;
