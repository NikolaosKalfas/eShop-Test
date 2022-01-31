import * as React from "react";

import ProductGrid from "../components/ProductGrid/ProductGrid";
import { Layout } from "../components/Layout/Layout";

const homepageMeta = {
  title: "eShop - Test",
  description: "This is a test site for linking Shopify & Gatsby",
};

const IndexPage = () => {
  return (
    <Layout title={homepageMeta.title} description={homepageMeta.description}>
      <h1>Hello World!!</h1>
      <ProductGrid />
    </Layout>
  );
};

export default IndexPage;
