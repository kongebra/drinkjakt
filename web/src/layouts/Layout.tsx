import React from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <main className="d-flex flex-column flex-fill bg-light">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
