import React from "react";

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";
import { RecipeDetails } from "@studio/schema";
import Head from "next/head";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Rating from "components/Rating";

import BlockContent from "@sanity/block-content-to-react";
import serializer from "lib/serializer";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const RecipePage: React.FC<Props> = ({ recipe }) => {
  const router = useRouter();

  const imageProps = useNextSanityImage(getClient(), recipe.image, {
    imageBuilder: (builder, options) => {
      return builder
        .width(1920)
        .height(1080)
        .fit("clip")
        .quality(options.quality || 100);
    },
  });

  // const renderTags = () => {
  //   if (recipe.tags) {
  //     return (
  //       <div className="d-flex justify-content-center align-items-center mb-3">
  //         {recipe.tags?.map((item) => (
  //           <div key={item._ref}>{item._ref}</div>
  //         ))}
  //       </div>
  //     );
  //   }

  //   return null;
  // };

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
        <meta property="og:image:width" content={imageProps.width.toString()} />
        <meta
          property="og:image:height"
          content={imageProps.height.toString()}
        />

        {recipe?.ingredients?.map((item) => (
          <meta
            key={item.ingredient?._id}
            property="article:tag"
            content={item.ingredient?.name}
          />
        ))}

        <title>{recipe.name} | DrinkJakt</title>
      </Head>

      <section className="mb-3">
        <div className="container mx-auto">
          <div className="-mx-10">
            <Image {...imageProps} alt={recipe.name} />
          </div>
        </div>
      </section>

      <section className="mb-3">
        <div className="container mx-auto">
          <div className="flex gap-3">
            {/* Left side (narrow) */}
            <div className="min-w-[16rem] flex flex-col gap-3">
              {/* Buttons */}
              <div className="bg-white rounded-5 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    className="bg-teal-500 hover:bg-teal-700 transition-colors text-white rounded-5 w-16 h-16 flex justify-center items-center"
                  >
                    <FaRegHeart size={24} />
                  </button>
                  <span className="font-semibold">Lagre</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-white rounded-5 p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-center mb-3">
                  Ingredienser
                </h2>

                <ul className="list-none pt-5 flex flex-col gap-3 border-t border-t-gray-300">
                  {recipe.ingredients?.map((item) => (
                    <li key={item.ingredient?._id} className="font-semibold">
                      <span data-amount={item.amount}>{`${item.amount} `}</span>
                      <span data-unit={item.unit}>{`${item.unit} `}</span>
                      <span>{item.ingredient?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side (main content) */}
            <div className="flex-auto flex flex-col gap-3">
              {/* Main Content (Recipe) */}
              <div className="bg-white rounded-5 p-6">
                {/* Recipe Title */}
                <h1 className="text-6xl font-semibold uppercase text-center mb-5 mt-5">
                  {recipe.name}
                </h1>

                {/* Rating & Comments count */}
                <div className="flex justify-center items-center gap-5 mb-5">
                  {/* Open modal to rate recipe */}
                  <button
                    type="button"
                    className="text-lg font-semibold flex items-center gap-1"
                    onClick={() => {
                      console.log("TODO: Implement Rating Modal");
                    }}
                  >
                    <Rating size={18} />
                    <span className="leading-none">
                      {`(${recipe.ratings?.length || 0})`}
                    </span>
                  </button>

                  {/* TODO: Implement comments to backend */}
                  {/* Scroll down to comment section */}
                  {/* <a href="#comments"></a> */}
                </div>

                {/* Instructions */}
                <BlockContent
                  blocks={recipe.instructions || []}
                  serializers={serializer}
                />

                {/* Rate recipe (5 start clickable) */}
                {/* TODO: Create this component */}
              </div>
            </div>
          </div>
        </div>
      </section>
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
