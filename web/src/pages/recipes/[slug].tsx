import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";
import { RecipeDetails } from "@studio/schema";
import Head from "next/head";
import { urlFor } from "lib/sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCartPlus,
  FaRegCalendarAlt,
  FaRegHeart,
} from "react-icons/fa";

interface Props {
  recipe: RecipeDetails;
}

const RecipePage: React.FC<Props> = ({ recipe }) => {
  const router = useRouter();

  const imageProps = useNextSanityImage(getClient(), recipe.image!);
  const displayImageProps = useNextSanityImage(getClient(), recipe.image!, {
    imageBuilder: (builder, options) => {
      return builder
        .width(1920)
        .height(1080)
        .fit("clip")
        .quality(options.quality || 100);
    },
  });

  const renderTags = () => {
    if (recipe.tags) {
      return (
        <div className="d-flex justify-content-center align-items-center mb-3">
          {recipe.tags?.map((item) => (
            <div>{item._ref}</div>
          ))}
        </div>
      );
    }

    return null;
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

      <section>
        <div className="container">
          <div className="row">
            <Image {...displayImageProps} alt={recipe.name} />
          </div>
        </div>
      </section>

      <section className="p-4">
        <div className="container">
          <div className="d-flex gap-3 px-4">
            <div>
              <div className="bg-white p-3 rounded-5 mb-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "64px", height: "64px", padding: "0" }}
                  >
                    <FaRegHeart size={24} />
                  </button>
                  <span>Lagre</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "64px", height: "64px", padding: "0" }}
                  >
                    <FaCartPlus size={24} />
                  </button>
                  <span>Legg i handlelisten</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "64px", height: "64px", padding: "0" }}
                  >
                    <FaRegCalendarAlt size={24} />
                  </button>
                  <span>Legg i ukeplanen</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-5 mb-3">
                <h2 className="text-center fs-5 mb-3">Ingredienser</h2>

                <div className="border-top pt-3">
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {recipe.ingredients?.map((item, index) => (
                      <li key={item.ingredient?._id}>
                        <span
                          data-amount={item.amount}
                        >{`${item.amount} `}</span>
                        <span data-unit={item.unit}>{`${item.unit} `}</span>
                        <span>{item.ingredient?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-top pt-3">
                  <p>dele lenke</p>
                  <p>send på epost</p>
                </div>
              </div>
            </div>

            <div className="flex-fill bg-white p-3 rounded-5 mb-3">
              <div className="text-center">
                {renderTags()}

                <h1>{recipe.name}</h1>

                <p>rating (1) kommentarer (0)</p>

                <p>description</p>
              </div>

              <div className="border-top border-bottom py-3 mb-3 d-flex justify-content-center gap-3">
                <span>tid</span>
                <span>vansklighetsgrad</span>
              </div>

              <div className="py-3">
                <p>
                  <strong>Slik gjør du</strong>
                </p>
                <ul>
                  <li>step 1</li>
                  <li>step 2</li>
                  <li>step 3</li>
                  <li>step ...</li>
                </ul>
              </div>

              <div className="border-top pt-3 text-center">
                <p>vurder oppskrift</p>
                <p>rating knapp (stjerner)</p>
              </div>
            </div>
          </div>

          {/* <div className="d-flex px-4">
            <div className="bg-white p-3 rounded-5 flex-fill">
              <h3 className="text-center">Kommentarer</h3>
            </div>
          </div> */}
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
  };
};

export default RecipePage;
