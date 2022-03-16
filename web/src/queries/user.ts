import { groq } from "next-sanity";

const currentUserBySubQuery = groq`*[_type == "user" && auth0_sub == $sub][0]`;

export { currentUserBySubQuery };
