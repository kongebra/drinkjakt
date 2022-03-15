import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  const { user, isLoading, error, checkSession } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      console.log(error);
      router.push("/api/auth/login");
    }

    console.log({ user, isLoading, error });
  }, [error, isLoading, router, user]);

  if (isLoading) {
    return (
      <>
        <p>Laster ...</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Log in | DrinkJakt</title>
      </Head>

      <div className="container bg-white flex-fill">
        <h1>Login</h1>
      </div>
    </>
  );
};

export default LoginPage;
