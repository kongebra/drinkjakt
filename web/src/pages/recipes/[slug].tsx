import React, { useEffect, useState } from "react";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { groq } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";

import { getClient } from "lib/sanity.server";
import serializer from "lib/serializer";

import { RecipeDetails } from "schema";

import { useAppUser, useRatings } from "hooks";

import { FaHeart } from "react-icons/fa";

import BlockContent from "@sanity/block-content-to-react";

import Button from "components/Button";
import FavoriteHeart from "components/FavoriteHeart";
import RatingButton from "components/RatingButton";
import Portions from "components/Portions";
import Link from "next/link";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const RecipePage: React.FC<Props> = ({ recipe }) => {
  const router = useRouter();

  const { user } = useAppUser();

  const [favorite, setFavorite] = useState<boolean>(
    user?.favorites?.some((f) => f._ref === recipe._id) || false
  );

  const { rating, count } = useRatings(recipe._id);

  const [portions, setPortions] = useState<number>(1);

  const imageProps = useNextSanityImage(getClient(), recipe.image);

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
        .then(() => {})
        .catch(() => {
          setFavorite((prev) => prev);
        });
    }
  };

  const calculateAmount = (amount: number, multiplier: number) => {
    return amount * multiplier;
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
        <meta property="og:image" content={imageProps.src} />
        <meta property="og:image:width" content={`${imageProps.width}`} />
        <meta property="og:image:height" content={`${imageProps.height}`} />

        {recipe?.ingredients?.map((item) => (
          <meta
            key={item.ingredient?._id}
            property="article:tag"
            content={item.ingredient?.name}
          />
        ))}

        <title>{recipe.name} | DrinkJakt</title>
      </Head>

      <article
        id={`recipe_${recipe.slug.current}`}
        className="container mx-auto"
      >
        <section id="recipe_image" className="mb-3">
          <Image {...imageProps} layout="responsive" alt={recipe.name} />
        </section>

        <section
          id="recipe_title"
          className="flex justify-center items-center py-3 mb-3"
        >
          <h1 className="text-3xl lg:text-5xl font-bold">{recipe.name}</h1>
        </section>

        <section
          id="recipe_rating"
          className="px-5 py-3 mb-3 flex flex-row justify-between lg:justify-around items-center bg-white rounded"
        >
          <div className="flex gap-2 justify-center items-center">
            <RatingButton
              initialValue={rating}
              onClick={(rating) => {
                console.log("user set rating", rating);
              }}
              count={count}
              showCount
            />
          </div>

          <FavoriteHeart
            active={favorite}
            onClick={handleOnClickFavorite}
            title={favorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
            size="3xl"
          />
        </section>

        <div className="flex flex-col lg:flex-row lg:gap-3">
          <div className="lg:min-w-[20rem]">
            <section
              id="recipe_ingredients"
              className="px-5 py-3 lg:mb-3 bg-white rounded"
            >
              <h2 className="text-2xl font-bold mb-5 text-center">
                Ingredienser
              </h2>

              <Portions onChange={setPortions} className="mb-3" />

              <hr className="border-stone-300 mb-3" />

              <ul className="mb-3">
                {recipe.ingredients?.map((ingredient) => (
                  <li key={ingredient.ingredient?._id} className="flex gap-1">
                    {ingredient.amount && (
                      <strong>
                        {calculateAmount(ingredient.amount, portions)}{" "}
                        {ingredient.unit}
                      </strong>
                    )}
                    <span>
                      <Link
                        href={`/ingredients/${encodeURIComponent(
                          ingredient.ingredient?.slug.current!
                        )}`}
                      >
                        <a className="text-sky-500 font-semibold hover:underline">
                          {ingredient.ingredient?.name}
                        </a>
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>

              <Button color="secondary" size="sm" outline fullWidth>
                Legg ingredienser i barskap
              </Button>
            </section>

            <section
              id="recipe_equipment"
              className="px-5 py-3 mb-3 bg-white rounded"
            >
              <h2 className="text-2xl font-bold mb-3">Utstyr</h2>
              <ul>
                <li>Målebeger</li>
                <li>Shaker</li>
              </ul>
            </section>
          </div>

          <div className="flex-auto">
            <section
              id="recipe_instructions"
              className="flex-auto px-5 py-3 mb-3 bg-white rounded"
            >
              <h2 className="text-2xl font-bold mb-3">Slik gjør du</h2>

              <BlockContent
                blocks={recipe.instructions || []}
                serializers={serializer}
              />
            </section>

            <section
              id="recipe_like_rate"
              className="px-5 py-3 mb-3 bg-white rounded"
            >
              <Button
                className="uppercase gap-2"
                color="danger"
                outline={favorite}
                size="lg"
                fullWidth
                title={
                  favorite ? "Lagt til i favoritter" : "Legg til i favoritter"
                }
              >
                <FaHeart />{" "}
                {favorite ? "Lagt til i favoritter" : "Legg til i favoritter"}
              </Button>
            </section>
          </div>
        </div>
      </article>
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
    viewCount,
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
    instructions,
    "ratings": *[_type == "rating" && recipe._ref == ^._id] {
      rating
    }
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

  await getClient(true).patch(recipe._id).inc({ viewCount: 1 }).commit();

  return {
    props: {
      recipe,
    },
    revalidate: 10,
  };
};

export default RecipePage;
