import "styles/globals.scss";

import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0";

import Layout from "layouts/Layout";

import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ToastifyContainer />
    </UserProvider>
  );
}

export default App;
