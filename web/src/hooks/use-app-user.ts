import { useUser } from "@auth0/nextjs-auth0";
import { User } from "schema";
import { getClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { useEffect, useMemo, useState } from "react";

export function useAppUser() {
  const { user: authUser } = useUser();

  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const query = groq`*[_type == "user" && auth0_sub == $sub][0]`;
  const params = useMemo(() => ({ sub: authUser?.sub || "" }), [authUser?.sub]);

  useEffect(() => {
    const subsription = getClient()
      .listen<User>(query, params)
      .subscribe((update) => {
        setUser(update.result);
      });

    return () => {
      subsription.unsubscribe();
    };
  }, [query, authUser, params]);

  useEffect(() => {
    getClient()
      .fetch<User>(query, params)
      .then(setUser)
      .catch(() => setError("Could not fetch user."))
      .finally(() => setIsLoading(false));
  }, [params, query]);

  return { user, isLoading, error };
}
