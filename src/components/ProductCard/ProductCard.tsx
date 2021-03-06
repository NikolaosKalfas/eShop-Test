import React, { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { MakeSlug } from "../../helpers/makeSlug";

export interface ProductCardType {
  image: any;
  imgAlt: string;
  name: string;
  description?: string;
  tags: string[];
  price: string;
  currency: string;
  variants: VariantsType[];
}

export type VariantsType = {
  price: string;
  title: string;
  storefrontId: string;
};

function ProductCard({
  image,
  imgAlt,
  name,
  description,
  tags,
  price,
  currency,
  variants,
}: ProductCardType) {
  const [variantId, setVariantId] = useState(variants[0].storefrontId);

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

  return (
    <div className="product-card rounded p-4">
      <Link to={`${process.env.GATSBY_WEBSITE_URL}/products/${MakeSlug(name)}`}>
        <GatsbyImage image={image} alt={imgAlt} />
      </Link>
      <div className="mb-5">
        <Link
          to={`${process.env.GATSBY_WEBSITE_URL}/products/${MakeSlug(name)}`}
          className="font-semibold text-2xl my-2"
        >
          {name}
        </Link>
        <div className="flex flex-row text-xs">
          {tags.map((tag) => (
            <p className="mr-2 bg-gray-200 rounded p-1" key={tag}>
              {tag}
            </p>
          ))}
        </div>
      </div>
      <p className="mb-5 text-xl">{description}</p>
      <p className="mb-5">
        {price} {currency}
      </p>
      {variants && variants.length > 1 && (
        <select
          name="variantIds"
          className="block border border-black rounded my-2 cursor-pointer"
          onChange={setId}
          value={variantId}
        >
          {variants.map((variant) => (
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
  );
}

export default ProductCard;
