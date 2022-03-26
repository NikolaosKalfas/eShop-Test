const path = require(`path`);
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
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
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.title}`,
      component: path.resolve(`./src/templates/Product.tsx`),
      context: {
        product: node,
      },
    });
  });
};
