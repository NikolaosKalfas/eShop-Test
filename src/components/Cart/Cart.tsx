import React, { useState } from "react";
import { useEffect } from "react";

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
    const getCart = async () => {
      let localCartData = JSON.parse(
        window.localStorage.getItem("eShop-test:cart")
      );

      if (localCartData) {
        const existingCart = await fetch(
          `/api/load-cart?cartId=${localCartData.cartId}`
        ).then((res) => res.json());

        setCart({
          id: localCartData.cartId,
          checkoutUrl: localCartData.checkoutUrl,
          estimatedCost: existingCart.cart.estimatedCost,
          lines: existingCart.cart.lines.edges,
        });

        return;
      }

      localCartData = await fetch("/api/create-cart").then((res) => res.json());

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
    };

    getCart();

    // set a timer to check if cart is empty
    const interval = setInterval(() => {
      const state = window.localStorage.getItem("eShop-test:status");

      if (state && state === "dirty") {
        getCart();
        window.localStorage.setItem("eShop-test:status", "clean");
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const emptyCart = () => {
    window.localStorage.removeItem("eShop-test:cart");
    window.localStorage.setItem("eShop-test:status", "dirty");
  };

  let cost = Number(cart?.estimatedCost?.totalAmount?.amount || 0);

  return (
    <div id="cart" className="closed h-full absolute bg-white min-w-1/4 z-30">
      <div
        className="flex flex-row items-start pb-10 shadow w-full py-5 px-10"
        onClick={closeCart}
      >
        <div>X</div>
        <button>Close</button>
      </div>
      <div className="py-5 px-10">
        <h3 className="pb-10">Your Cart</h3>
        {cart.lines.length > 0 ? (
          <>
            <ul>
              {cart.lines.map(({ node: item }) => (
                <li>
                  <p>
                    {item.quantity} &times; {item.merchandise?.product?.title}
                  </p>
                </li>
              ))}
              <li>
                {/* TODO: fix cost */}
                <p>Total: {cost === 0 ? "FREE" : `$${cost}`}</p>
              </li>
            </ul>
            <a href={`${cart.checkoutUrl}`}>Check out</a>
            <button onClick={emptyCart}>Empty your cart</button>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
