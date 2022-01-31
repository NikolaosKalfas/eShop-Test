import React from "react";

import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ data }) {
  return (
    <div className="product-grid-container">
      <h2>My products</h2>
      <div className="product-grid">
        {data.allShopifyProduct.nodes.map((product) => (
          <ProductCard
            key={product.id}
            image={product.featuredImage.localFile.childImageSharp.fixed}
            imgAlt={product.title}
            name={product.title}
            description={product.description}
            type={product.productType}
            tags={product.tags.map((tag) => (
              <p>{tag}</p>
            ))}
            price={product.variants[0].price}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
