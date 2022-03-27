import { Link } from "gatsby";
import React from "react";
import { useAppSelector } from "../../app/hooks";

const Nav = () => {
  const cartItemsNum = useAppSelector((state) => state.cart.value);

  const openCart = () => {
    const cartIcon = document.getElementById("cart");
    cartIcon.classList.remove("closed");
    cartIcon.classList.add("open");
  };

  return (
    <div className="flex items-center justify-between py-5 px-10 md:px-20 shadow sticky top-0 bg-white z-20">
      <Link to={"/"}>Home</Link>
      <div className="flex flex-row">
        <button onClick={openCart} className="mr-2">
          <i className="fa-solid fa-cart-shopping"></i>{" "}
        </button>
        <div className=" cart-count bg-blue-300 rounded-full h-6 w-6 pb-1 pl-2 font-semibold">
          {cartItemsNum}
        </div>
      </div>
    </div>
  );
};

export default Nav;
