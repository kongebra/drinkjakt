import "styles/globals.scss";

import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0";

import SSRProvider from "react-bootstrap/SSRProvider";

import Layout from "layouts/Layout";

import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <ToastifyContainer />
      </SSRProvider>
    </UserProvider>
  );
}

export default App;
