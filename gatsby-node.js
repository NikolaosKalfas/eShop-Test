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

  function MakeSlug(Text) {
    const slug = Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    if (slug === "home-page") return "/";
    else return slug;
  }
  // Iterate over all products and create a new page using a template
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${MakeSlug(node.title)}`,
      component: path.resolve(`./src/templates/Product.tsx`),
      context: {
        product: node,
      },
    });
  });
};
