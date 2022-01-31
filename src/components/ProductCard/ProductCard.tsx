import React from "react";
import Image from "gatsby-image";

function ProductCard({ image, imgAlt, name, description, type, tags, price }) {
  return (
    <div className="product-card">
      <Image fixed={image} alt={imgAlt} />
      <h3 className="">{name}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <p>&pound;{price}</p>
      <div>{tags}</div>
    </div>
  );
}

export default ProductCard;
