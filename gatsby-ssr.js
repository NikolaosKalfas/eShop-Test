import "./src/styles/index.css";

import React from "react";
import { Helmet } from "react-helmet";

import { store } from "./src/app/store";
import { Provider } from "react-redux";

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <Helmet>
        <meta
          name="description"
          content="This is a test project to try and link Shopify and Gatsby"
        />
      </Helmet>
      {element}
    </Provider>
  );
};
