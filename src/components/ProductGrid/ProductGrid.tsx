import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import ProductCard from "../ProductCard/ProductCard";

function ProductGrid() {
  const query = useStaticQuery(graphql`
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
                fixed(
                  width: 100
                  height: 100
                  fit: COVER
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          variants {
            sku
            price
            storefrontId
          }
        }
      }
    }
  `);

  console.log(query);

  return (
    <div className="product-grid-container py-5 px-20">
      <h2 className="py-5">My products</h2>
      <div className="product-grid">
        {query.allShopifyProduct.nodes.map((product) =>
          product.variants.map((variant) => (
            <ProductCard
              keyId={variant.storefrontId}
              image={product.featuredImage.localFile.childImageSharp.fixed}
              imgAlt={product.title}
              name={product.title}
              description={product.description}
              type={product.productType}
              tags={product.tags.map((tag) => (
                <p>{tag}</p>
              ))}
              price={variant.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
