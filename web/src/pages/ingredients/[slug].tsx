import { getClient } from "lib/sanity.server";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Ingredient } from "schema";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const IngredientsPage: React.FC<Props> = ({ ingredient }) => {
  console.log({ ingredient });

  return <div>{ingredient.slug.current}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugQuery = groq`*[_type == "ingredient" && defined(slug.current)][].slug.current`;
  const paths = await getClient().fetch(allSlugQuery);

  return {
    paths: paths.map((slug: string) => `/ingredients/${slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  ingredient: Ingredient;
}> = async (context) => {
  const slug = context.params?.slug as string;

  const query = groq`*[_type == "ingredient" && slug.current == $slug][0] {
        _id,
        name,
        slug,
    }`;

  const ingredient = await getClient().fetch<Ingredient>(query, { slug });

  if (!ingredient) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ingredient,
    },
  };
};

export default IngredientsPage;
