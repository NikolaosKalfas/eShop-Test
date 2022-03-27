import { graphql, useStaticQuery } from "gatsby";

export default function useShopify() {
  const query = useStaticQuery(graphql`
    {
      allShopifyProduct {
        edges {
          node {
            id
            title
            tags
            storefrontId
            productType
            totalInventory
            totalVariants
            tracksInventory
            description
            variants {
              price
              title
              storefrontId
              inventoryQuantity
            }
            images {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `);

  const products = query.allShopifyProduct.edges;

  return products;
}
