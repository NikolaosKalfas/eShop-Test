import React from "react";
import Image from "gatsby-image";

function ProductCard({
  keyId,
  image,
  imgAlt,
  name,
  description,
  type,
  tags,
  price,
}) {
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
      body: JSON.stringify({ cartId: localCartData.cartId, variantId: keyId }),
    });

    if (!result.ok) {
      console.error("There was a problem adding the item to the cart");
      return;
    }

    // set cart status so it updates
    window.localStorage.setItem("eShop-test:status", "dirty");
  };

  return (
    <div className="product-card" key={keyId}>
      <Image fixed={image} alt={imgAlt} />
      <h3 className="">{name}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <p>&pound;{price}</p>
      <div className="flex flex-row justify-between">{tags}</div>
      <p>{keyId}</p>
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
