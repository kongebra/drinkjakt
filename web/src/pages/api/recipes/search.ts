// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getClient } from "lib/sanity.server";
import { PageData } from "models/page-data";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { RecipeDetails } from "schema";

type RecipeDetailsExtras = {
  totalCount?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageData<RecipeDetails>>
) {
  const offsetParam = req.query.offset || "0";
  const limitParam = req.query.limit || "10";
  const orderByParam = req.query.order_by || "_createdAt";
  const descParam = req.query.desc || "false";

  const offset = parseInt(offsetParam as string, 10);
  const limit = parseInt(limitParam as string, 10);
  const desc = descParam === "desc";

  const pagination = `[${offset}...${offset + limit}]`;

  const query = groq`*[_type == "recipe"] | order(${orderByParam} ${
    desc ? "desc" : "asc"
  }) {
    "totalCount": count(*[_type == "recipe"]),

    _id,
    _createdAt,

    name,
    slug,

    image,

    "ingredientsCount": count(ingredients),
     ingredients[] {
      ingredient->{
        _id,
        name,
        slug,
      },
      amount,
      unit
    },

    "ratings": *[_type == "rating" && references(^._id)] {
        rating
    },
    "ratingCount": count(*[_type == "rating" && references(^._id)])
  }${pagination}`;

  const result = await getClient().fetch<
    Array<RecipeDetails & RecipeDetailsExtras>
  >(query);

  const first = result.find((x) => x);
  const total = first && first.totalCount ? first.totalCount : 0;
  const canNext = offset + limit <= total;
  const canPrev = offset - limit >= 0;

  // Clean up data
  result.forEach((item) => {
    delete item.totalCount;
  });

  const response: PageData<RecipeDetails> = {
    pagination: {
      offset,
      limit,
      total,
    },
    data: result,
    links: {
      next: canNext
        ? `/api/recipes/search?offset=${offset + limit}?limit=${limit}`
        : undefined,
      prev: canPrev
        ? `/api/recipes/search?offset=${offset - limit}?limit=${limit}`
        : undefined,
    },
  };

  res.status(200).json(response);
}
