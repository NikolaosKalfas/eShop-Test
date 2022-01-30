import React from "react";
import Image from "gatsby-image";

function ProdactCard({ image, imgAlt, name, description, type, tags, price }) {
  return (
    <div className="product-card">
      <Image fixed={image} alt={imgAlt} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <div>{tags}</div>
      <p>&pound;{price}</p>
    </div>
  );
}

export default ProdactCard;
