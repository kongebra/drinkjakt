import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { ParsedUrlQuery } from "querystring";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { Rating, Recipe } from "@studio/schema";

function filterDataToSingleItem<T extends { _id: string }>(
  data: T | Array<T>,
  preview: boolean
): T {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length === 1) {
    return data[0];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
}

interface Props {
  recipe: Recipe;
  ratings: Array<Rating>;
}

const RecipePage: React.FC<Props> = ({ recipe, ratings }) => {
  const router = useRouter();

  const averageRating = React.useMemo<number>(() => {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((prev, curr) => {
      return prev + (curr?.rating || 0);
    }, 0);

    return sum / ratings.length;
  }, [ratings]);

  React.useEffect(() => {
    console.log({ recipe, ratings });
  }, []);

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

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview = false,
}) => {
  const query = groq`*[_type == "recipe" && slug.current == $slug]`;
  const queryParams = { slug: (params as IParams).slug };

  const data = await getClient(preview).fetch<Recipe>(query, queryParams);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const recipe = filterDataToSingleItem(data, preview);

  const ratingQuery = groq`*[_type == "rating" && recipe._ref == $id][]`;
  const ratingQueryParams = { id: recipe._id };

  const ratings = await getClient(preview).fetch<Array<Rating>>(
    ratingQuery,
    ratingQueryParams
  );

  return {
    props: {
      recipe,
      ratings: ratings || [],
    },
  };
};

export default RecipePage;
