import { Recipe, SanityKeyedReference, User } from "@studio/schema";
import { getClient } from "lib/sanity.server";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";

type Body = {
  userId: string;
  recipeId: string;
};

type Response = {
  message: string;
  removed?: boolean;
  inserted?: SanityKeyedReference<Recipe>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { userId, recipeId } = req.body as Body;

    const client = getClient(true);

    const userQuery = groq`*[_type == "user" && _id == $id][0]`;
    const userParams = {
      id: userId,
    };

    const userResponse = await client.fetch<User>(userQuery, userParams);
    if (userResponse) {
      const alreadyFavorited = userResponse.favorites?.some(
        (x) => x._ref === recipeId
      );

      if (alreadyFavorited) {
        await client
          .patch(userId)
          .unset([`favorites[_ref == "${recipeId}"]`])
          .commit();

        return res.json({
          message: "favorite removed",
          removed: true,
          inserted: undefined,
        });
      }

      const recipeQuery = groq`*[_type == "recipe" && _id == $id][0]`;
      const recipeParams = {
        id: recipeId,
      };

      const recipeResponse = await client.fetch<Recipe>(
        recipeQuery,
        recipeParams
      );
      if (recipeResponse) {
        const newFavorite: SanityKeyedReference<Recipe> = {
          _key: nanoid(),
          _ref: recipeId,
          _type: "reference",
        };

        await client.patch(userId).append("favorites", [newFavorite]).commit();

        return res.json({
          message: "favorite added",
          removed: false,
          inserted: newFavorite,
        });
      }

      return res.status(404).json({ message: "recipe not found" });
    }

    return res.status(404).json({ message: "user not found" });
  }
}
