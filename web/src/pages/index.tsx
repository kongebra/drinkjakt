import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { FrontpageWithRecipes } from "@studio/schema";

import FeaturedRecipes from "components/FeaturedRecipes";
import InformationTab from "components/InformationTab";
import AppCard from "components/AppCard";
import { useNextSanityImage } from "next-sanity-image";

interface Props {
  frontpage: FrontpageWithRecipes;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>

      {/* <div className="container py-5">
        <div className="grid grid-cols-5">
          {frontpage && frontpage.recipes && frontpage.recipes.length > 0 && (
            <AppCard
              title="Long Island Iced Tea"
              href="/long-island-iced-tea"
              imageProps={useNextSanityImage(
                getClient(),
                frontpage.recipes![0]!.image!
              )}
              rating={4.5}
              difficulty="Lett"
              ingredients={["Rom", "Cola"]}
              color="teal"
            />
          )}
        </div>
      </div>

      <FeaturedRecipes frontpage={frontpage} />

      <section className="mb-5">
        <div className="container">
          <InformationTab
            text="Vil du vite mer om DrinkJakt?"
            buttonText="Les om oss her!"
          />
        </div>
      </section> */}
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
      difficulty,
      ingredients,
      
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
