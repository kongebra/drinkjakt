import { Recipe, SanityKeyedReference, User } from "schema";
import { getClient } from "lib/sanity.server";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";

type Body = {
  userId: string;
  recipeId: string;
  favorite: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, recipeId, favorite } = req.body as Body;

    const client = getClient(true);

    const userQuery = groq`*[_type == "user" && _id == $id][0]`;
    const userParams = {
      id: userId,
    };

    // find user
    const userResponse = await client.fetch<User>(userQuery, userParams);
    if (userResponse) {
      // check if recipe in favorites already
      const alreadyFavorited = userResponse.favorites?.some(
        (x) => x._ref === recipeId
      );

      console.log({ alreadyFavorited, favorite });

      if (alreadyFavorited) {
        // already favorite, and like to favorite it again (just chill)
        if (favorite) {
          return res
            .status(200)
            .json({ message: "recipe was already favorite" });
        }

        const unsetResponse = await client
          .patch(userId)
          .unset([`favorites[_ref == "${recipeId}"]`])
          .commit();

        return res.json(unsetResponse);
      }

      // recipe is not fav from before, and we want to unlike it, just drop any other actions
      if (favorite === false) {
        return res
          .status(200)
          .json({ message: "cannot unfavorite recipe that is not favorited" });
      }

      // find recipe
      const recipeQuery = groq`*[_type == "recipe" && _id == $id][0]`;
      const recipeParams = {
        id: recipeId,
      };

      const recipeResponse = await client.fetch<Recipe>(
        recipeQuery,
        recipeParams
      );
      // check if recipe exists
      if (recipeResponse) {
        const newFavorite: SanityKeyedReference<Recipe> = {
          _key: nanoid(),
          _ref: recipeId,
          _type: "reference",
        };

        const appendResponse = await client
          .patch(userId)
          .append("favorites", [newFavorite])
          .commit();

        return res.json(appendResponse);
      }

      return res.status(404).json({ message: "recipe not found" });
    }

    return res.status(404).json({ message: "user not found" });
  }
}
