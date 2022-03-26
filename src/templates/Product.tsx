import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { Layout } from "../components/Layout/Layout";

const Product = ({ pageContext }) => {
  const { product } = pageContext;
  const [variantId, setVariantId] = useState(product.variants[0].storefrontId);

  const addToCart = async () => {
    let localCartData = JSON.parse(
      window.localStorage.getItem("eShop-test:cart")
    );

    if (!localCartData.cartId) {
      console.error("There was an error loading your cart");
      return;
    }

    const result = await fetch("/api/add-to-cart", {
      method: "POST",
      body: JSON.stringify({
        cartId: localCartData.cartId,
        variantId: variantId,
      }),
    });

    if (!result.ok) {
      console.error("There was a problem adding the item to the cart");
      return;
    }

    // set cart status so it updates
    window.localStorage.setItem("eShop-test:status", "dirty");
  };

  const setId = (e) => {
    setVariantId(e.target.value);
  };

  console.log(product);

  const image = getImage(
    product.images[0].localFile.childImageSharp.gatsbyImageData
  );

  return (
    <Layout title={product.title} description={product.description}>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <GatsbyImage image={image} alt={product.title} className="" />
        <div className="product-description">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.priceRangeV2.minVariantPrice.amount}</p>
          <p>{product.priceRangeV2.minVariantPrice.currencyCode}</p>
          {product.tags.map((tag) => (
            <p className="mr-2 bg-gray-200 rounded p-1" key={tag}>
              {tag}
            </p>
          ))}
          {product.variants && product.variants.length > 1 && (
            <select
              name="variantIds"
              className="block border border-black rounded my-2 cursor-pointer"
              onChange={setId}
              value={variantId}
            >
              {product.variants.map((variant) => (
                <option
                  value={variant.storefrontId}
                  key={variant.storefrontId}
                  label={variant.title}
                ></option>
              ))}
            </select>
          )}
          <button
            className="bg-yellow-500 py-1 px-2 rounded hover:bg-yellow-600"
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
      ;
    </Layout>
  );
};

export default Product;
