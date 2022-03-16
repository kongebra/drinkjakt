import { useState } from "react";
import { useQuery } from "react-query";

import { useUser } from "@auth0/nextjs-auth0";

import { User } from "schema";

import { getClient } from "lib/sanity.server";

import { currentUserBySubQuery } from "queries";

export function useAppUser() {
  const { user: authUser, isLoading: authIsLoading } = useUser();

  const [client] = useState(getClient());
  const { data, isLoading, ...rest } = useQuery(
    "appUser",
    () => client.fetch<User>(currentUserBySubQuery, { sub: authUser?.sub }),
    {
      enabled: !!authUser,
    }
  );

  return { user: data, isLoading: isLoading || authIsLoading, ...rest };
}
