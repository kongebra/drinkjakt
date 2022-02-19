import { useUser } from "@auth0/nextjs-auth0";
import { User } from "schema";
import { getClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";

export function useAppUser() {
  const { user: authUser } = useUser();

  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const query = groq`*[_type == "user" && auth0_sub == $sub][0]`;

  useEffect(() => {
    if (authUser?.sub) {
      setIsLoading(true);
      getClient()
        .fetch<User>(query, { sub: authUser?.sub })
        .then((res) => {
          setUser(res);
        })
        .catch(() => setError("Could not fetch user."))
        .finally(() => setIsLoading(false));
    }
  }, [authUser?.sub, query]);

  return { user, isLoading, error };
}
