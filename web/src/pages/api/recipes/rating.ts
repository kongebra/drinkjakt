import { getClient } from "lib/sanity.server";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { Rating } from "schema";

type Request = {
  recipeId: string;
  userId: string;
  rating: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipeId, userId, rating } = req.body as Request;

  if (rating > 5) {
    return res.status(400).json({ message: "rating cannot be higher than 5" });
  }

  if (rating < 1) {
    return res.status(400).json({ message: "rating cannot be lower than 1 " });
  }

  const client = getClient(true);
  const fetchQuery = groq`*[_type == "rating" && user._ref == $userId && recipe._ref == $recipeId][0]`;
  const existingRating = await client.fetch(fetchQuery, {
    userId,
    recipeId,
  });

  if (existingRating) {
    const updateResponse = await client
      .patch(existingRating._id)
      .set({ rating })
      .commit();

    return res.status(200).json(updateResponse);
  }

  const createResponse = await client.create<Partial<Rating>>({
    _type: "rating",
    _id: nanoid(),
    recipe: {
      _type: "reference",
      _ref: recipeId,
    },
    user: {
      _type: "reference",
      _ref: userId,
    },
    rating,
  });

  return res.status(201).json(createResponse);
}
