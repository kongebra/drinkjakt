import { NextApiRequest, NextApiResponse } from "next";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

import { RecipeDto } from "models";

import { FrontpageWithRecipes } from "schema";
import { ApiResponse } from "models/api-response";

interface Response {
  featured: Array<RecipeDto>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Response>>
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .setHeader("Allow", ["GET"])
      .json({ statusCode: 405, message: "method not allowed" });
  }

  const client = getClient();

  const query = groq`*[_type == "frontpage"][0] {
    "recipes": featured_recipes[]->{
        _id,
        name,
        slug,

        image,

        ingredients[] {
            "name": ingredient->name,
            "slug": ingredient->slug.current,
            amount,
            unit
        },

        "ratings": *[_type == "rating" && references(^._id)] {
            rating
        }
    },
}`;
  const response = await client.fetch<FrontpageWithRecipes>(query);

  const featured: Array<RecipeDto> =
    response.recipes?.map((item) => {
      let rating = 0;
      let ratingCount = 0;

      if (item.ratings) {
        ratingCount = item.ratings.length;
        rating =
          item.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          ratingCount;

        if (isNaN(rating)) {
          rating = 0;
        }
      }

      const recipe: RecipeDto = {
        id: item._id,
        name: item.name,
        slug: item.slug?.current || "",
        image: item.image,

        ingredientsCount: item.ingredients?.length || 0,

        rating,
        ratingCount,
      };

      return recipe;
    }) || [];

  return res.status(200).json({
    featured,
  });
}
