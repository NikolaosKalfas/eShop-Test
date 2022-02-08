import React, { useState } from "react";
import { useEffect } from "react";
import { handler } from "../../util/create-cart";

const Cart = () => {
  const [cart, setCart] = useState({
    id: null,
    lines: [],
    checkoutUrl: null,
    estimatedCost: null,
  });

  const closeCart = () => {
    const cartIcon = document.getElementById("cart");
    cartIcon.classList.remove("open");
    cartIcon.classList.add("closed");
  };

  useEffect(() => {
    async function getCart() {
      let localCartData;

      //TODO check for a local cart ID and get existing cart

      localCartData = await handler();

      setCart({
        id: localCartData.cartId,
        checkoutUrl: localCartData.checkoutUrl,
        estimatedCost: null,
        lines: [],
      });

      window.localStorage.setItem(
        "eShop-test:cart",
        JSON.stringify(localCartData)
      );
    }

    getCart();
  }, []);

  return (
    <div id="cart" className="closed h-full absolute bg-white min-w-1/4">
      <div
        className="flex flex-row items-start pb-10 shadow w-full py-5 px-10"
        onClick={closeCart}
      >
        <div>X</div>
        <button>Close</button>
      </div>
      <div className="py-5 px-10">
        <h3 className="pb-10">Your Cart</h3>
        <p>Your cart is empty</p>
      </div>
    </div>
  );
};

export default Cart;
