import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import ProductCard from "../ProductCard/ProductCard";

function ProductGrid() {
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

  console.log(query);

  return (
    <div className="product-grid-container py-5 px-20">
      <h2 className="my-16 text-4xl font-semibold">My products</h2>
      <div className="grid grid-cols-4 gap-4">
        {query.allShopifyProduct.edges.map((product) => (
          <ProductCard
            image={
              product.node.images[0].localFile.childImageSharp.gatsbyImageData
            }
            imgAlt={product.node.title}
            name={product.node.title}
            description={product.node.description}
            tags={product.node.tags.map((tag) => tag)}
            price={product.node.priceRangeV2.maxVariantPrice.amount}
            currency={product.node.priceRangeV2.maxVariantPrice.currencyCode}
            variants={product.node.variants}
            key={product.node.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
