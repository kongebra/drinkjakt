import React from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <main className="flex-fill">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
