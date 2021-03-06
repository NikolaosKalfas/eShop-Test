import React from "react";
import Helmet from "react-helmet";
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";

import Nav from "../Nav/Nav";

interface LayoutInterface {
  title: string;
  description: string;
}

export const Layout: React.FC<LayoutInterface> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script
          src="https://kit.fontawesome.com/75f8cd6059.js"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <Cart />
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
