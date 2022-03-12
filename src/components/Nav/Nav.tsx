import { Link } from "gatsby";
import React from "react";

const Nav = () => {
  const openCart = () => {
    const cartIcon = document.getElementById("cart");
    cartIcon.classList.remove("closed");
    cartIcon.classList.add("open");
  };

  return (
    <div className=" flex items-center justify-between py-5 px-20 shadow sticky top-0 bg-white">
      <Link to={"/"}>Home</Link>
      <button onClick={openCart}>Cart (0)</button>
    </div>
  );
};

export default Nav;
