import React from "react";
import Image from "gatsby-image";

function ProductCard({
  key,
  image,
  imgAlt,
  name,
  description,
  type,
  tags,
  price,
}) {
  // TODO: Rewatch guide to figure this function out. Not sure everything is supposed to be here.
  const addToCart = async () => {
    let localCartData = JSON.parse(
      window.localStorage.getItem("eShop-test:cart")
    );

    if (!localCartData.cartId) {
      console.error("There was an error loading your cart");
      return;
    }

    //TODO make this work - need to find how to get variantId (merchandise id)
    const result = await fetch("/api/add-to-cart", {
      method: "POST",
      body: JSON.stringify({ cartId: localCartData.cartId, variantId: "52" }),
    });

    if (!result.ok) {
      console.error("There was a problem adding the item to the cart");
      return;
    }
  };

  return (
    <div className="product-card" key={key}>
      <Image fixed={image} alt={imgAlt} />
      <h3 className="">{name}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <p>&pound;{price}</p>
      <div className="flex flex-row justify-between">{tags}</div>
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
