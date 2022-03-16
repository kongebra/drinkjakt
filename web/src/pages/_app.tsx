import "styles/globals.scss";

import type { AppProps } from "next/app";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "lib/client";

import { UserProvider } from "@auth0/nextjs-auth0";

import Layout from "layouts/Layout";

import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <ToastifyContainer />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
