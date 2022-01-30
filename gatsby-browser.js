import "./src/styles/index.css";

import React from "react";
import { Helmet } from "react-helmet";

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="This is a test project to try and link Shopify and Gatsby"
        />
      </Helmet>
      {element}
    </>
  );
};
