import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";
import { RecipeDetails } from "@studio/schema";

interface Props {
  recipe: RecipeDetails;
}

const RecipePage: React.FC<Props> = ({ recipe }) => {
  return (
    <div>
      <section>
        <div className="container">
          <h1>{recipe.name}</h1>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugQuery = groq`*[_type == "recipe" && defined(slug.current)][].slug.current`;
  const paths = await getClient().fetch(allSlugQuery);

  return {
    paths: paths.map((slug: string) => `/recipes/${slug}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = groq`*[_type == "recipe" && slug.current == $slug][0] {
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
  }`;
  const slug = context.params?.slug as string;

  const recipe = await getClient().fetch(query, { slug });

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
};

export default RecipePage;
