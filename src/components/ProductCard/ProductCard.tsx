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
  return (
    <div className="product-card" key={key}>
      <Image fixed={image} alt={imgAlt} />
      <h3 className="">{name}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <p>&pound;{price}</p>
      <div className="flex flex-row justify-between">{tags}</div>
      <button className="bg-yellow-500 py-1 px-2 rounded hover:bg-yellow-600">
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
