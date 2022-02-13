import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { ParsedUrlQuery } from "querystring";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { Rating, Recipe } from "@studio/schema";

interface Props {}

const RecipePage: React.FC<Props> = ({}) => {
  return <></>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugQuery = groq`*[_type == "recipe" && defined(slug.current)][].slug.current`;
  const paths = await getClient().fetch(allSlugQuery);

  return {
    paths: paths.map((slug: string) => `/recipe/${slug}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
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

  return {
    props: {},
  };
};

export default RecipePage;
