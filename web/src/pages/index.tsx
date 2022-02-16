import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { FrontpageWithRecipes } from "@studio/schema";

import FeaturedRecipes from "components/FeaturedRecipes";
import InformationTab from "components/InformationTab";
import AppCard from "components/AppCard";
import { useNextSanityImage } from "next-sanity-image";
import RecipeCard from "components/RecipeCard";

interface Props {
  frontpage: FrontpageWithRecipes;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>

      <div className="container mx-auto py-5">
        <div className="grid grid-cols-5 gap-5">
          {frontpage.recipes?.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
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
