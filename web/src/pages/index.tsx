import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { getClient } from "lib/sanity.server";

import { featuredRecipesQuery, FeaturedRecipesQueryResponse } from "queries";

import FrontpageRecipe from "components/FrontpageRecipe";

interface Props {
  frontpage: FeaturedRecipesQueryResponse;
}

const Home: NextPage<Props> = ({ frontpage }) => {
  return (
    <>
      <Head>
        <title>Forsiden | DrinkJakt</title>
      </Head>

      <section>
        <div className="container mx-auto pt-4 md:pt-8 pb-5 px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold mb-4 md:mb-8">
            Fremhevede drinker
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-4">
            {frontpage.featured_recipes.map((recipe) => (
              <FrontpageRecipe key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const frontpage = await getClient().fetch<FeaturedRecipesQueryResponse>(
    featuredRecipesQuery
  );

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
