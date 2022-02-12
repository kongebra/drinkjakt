import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { FrontpageWithRecipes } from "@studio/schema";

import FeaturedRecipes from "components/FeaturedRecipes";

interface Props {
  frontpage: FrontpageWithRecipes;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>
      <FeaturedRecipes frontpage={frontpage} />
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
      image,
      
      "ratings": *[_type == "rating" && recipe._id == ^._id]{
        rating
      }
    }
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
