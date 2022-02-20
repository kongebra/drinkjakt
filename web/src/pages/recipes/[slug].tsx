import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { groq } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";

import { getClient } from "lib/sanity.server";

import { RecipeDetails } from "schema";

import { useAppUser } from "hooks";

import RecipeDetailsComponent from "components/RecipeDetails";
import { urlFor } from "lib/sanity";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const RecipePage: React.FC<Props> = ({ recipe }) => {
  const router = useRouter();

  const { user } = useAppUser();

  const image = urlFor(recipe.image);
  const imageUrl = image.url();

  const [favorite, setFavorite] = useState<boolean>(
    user?.favorites?.some((f) => f._ref === recipe._id) || false
  );

  useEffect(() => {
    if (user && user.favorites) {
      setFavorite(user.favorites.some((f) => f._ref === recipe._id));
    }
  }, [recipe._id, user]);

  const handleOnClickFavorite = () => {
    if (user) {
      setFavorite((prev) => !prev);

      fetch("/api/profile/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          recipeId: recipe._id,
          favorite: !favorite,
        }),
      })
        .then(() => {
          if (favorite) {
            toast.info("Oppskrift fjernet fra favoritter.");
          } else {
            toast.success("Oppskrift lagt til i favoritter.");
          }
        })
        .catch(() => {
          setFavorite((prev) => prev);
        });
    }
  };

  return (
    <>
      <Head>
        {recipe.description && (
          <meta name="description" content={recipe.description} />
        )}

        <meta property="og:title" content={recipe.name} />
        <meta property="og:type" content={"article"} />
        <meta
          property="og:url"
          content={`${router.basePath}${router.asPath}`}
        />
        {recipe.description && (
          <meta property="og:description" content={recipe.description} />
        )}
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:image:width" content={`${image.options.width}`} />
        <meta property="og:image:height" content={`${image.options.height}`} />

        {recipe?.ingredients?.map((item) => (
          <meta
            key={item.ingredient?._id}
            property="article:tag"
            content={item.ingredient?.name}
          />
        ))}

        <title>{recipe.name} | DrinkJakt</title>
      </Head>

      <RecipeDetailsComponent
        recipe={recipe}
        favorite={favorite}
        onFavorite={handleOnClickFavorite}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugQuery = groq`*[_type == "recipe" && defined(slug.current)][].slug.current`;
  const paths = await getClient().fetch(allSlugQuery);

  return {
    paths: paths.map((slug: string) => `/recipes/${slug}`),
    fallback: false,
  };
};

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
        _id,
        name,
        slug,
      },
      amount,
      unit
    },
    instructions
  }`;

export const getStaticProps: GetStaticProps<{ recipe: RecipeDetails }> = async (
  context
) => {
  const slug = context.params?.slug as string;

  const recipe = await getClient().fetch<RecipeDetails>(query, { slug });

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
    revalidate: 10,
  };
};

export default RecipePage;
