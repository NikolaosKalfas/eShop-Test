import { Link } from "gatsby";
import React from "react";

const Nav = () => {
  return (
    <div className=" flex items-center justify-between py-5 px-20 shadow">
      <Link to={"/"}>Home</Link>
      <button>Cart (0)</button>
    </div>
  );
};

export default Nav;
