import { AfterCallback, handleAuth, handleCallback } from "@auth0/nextjs-auth0";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

const afterCallback: AfterCallback = async (req, res, session, state) => {
  const { user } = session;

  // get client
  const client = getClient(true);

  // query after user with given sub
  const query = groq`*[_type == "user" && auth0_sub == $sub][0]`;
  const params = {
    sub: user.sub,
  };
  const response = await client.fetch(query, params);

  // if no response, create new user with data from auth0
  if (!response) {
    await client.create({
      _type: "user",
      firstName: user.given_name,
      lastName: user.family_name,
      nickname: user.nickname,
      email: user.email,
      picture: user.picture || "",
      auth0_sub: user.sub,
    });
  } else {
  }

  // return session (unchanged)
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback: afterCallback });
    } catch (ex) {
      const error = ex as any;

      res.status(error.status || 500).end(error.message);
    }
  },
});
