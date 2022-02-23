import React from "react";
import Helmet from "react-helmet";

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
      </Helmet>
      {/* <Cart /> */}
      <Nav />
      {children}
    </div>
  );
};
