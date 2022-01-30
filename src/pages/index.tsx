import { graphql } from "gatsby";
import * as React from "react";
import "../styles/index.css";

import ProductGrid from "../components/ProductGrid/ProductGrid";

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

const IndexPage = ({ data }) => {
  return (
    <>
      <h1>Hello World!</h1>
      <ProductGrid data={data} />
    </>
  );
};

export default IndexPage;
