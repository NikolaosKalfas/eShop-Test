import { graphql } from "gatsby";
import * as React from "react";

import ProductGrid from "../components/ProductGrid/ProductGrid";
import { Layout } from "../components/Layout/Layout";

export const query = graphql`
  {
    allShopifyProduct(
      filter: { variants: { elemMatch: { availableForSale: { eq: true } } } }
    ) {
      nodes {
        title
        totalInventory
        tags
        description
        productType
        id
        featuredImage {
          localFile {
            childImageSharp {
              fixed(width: 100, height: 100, fit: COVER, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        variants {
          sku
          price
        }
      }
    }
  }
`;

const homepageMeta = {
  title: "eShop - Test",
  description: "This is a test site for linking Shopify & Gatsby",
};

const IndexPage = ({ data }) => {
  return (
    <Layout title={homepageMeta.title} description={homepageMeta.description}>
      <h1>Hello World!!</h1>
      <ProductGrid data={data} />
    </Layout>
  );
};

export default IndexPage;
