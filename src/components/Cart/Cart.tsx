import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../../features/counter/counterSlice";

const Cart = () => {
  // const cartItemsNum = useSelector((state) => state.cartItems.value);
  // const [itemsInCart, setItemsInCart] = useState(cartItemsNum);
  const dispatch = useDispatch();

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
      } else {
        localCartData = await fetch("/api/create-cart").then((res) =>
          res.json()
        );
      }

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

  console.log(cart);

  // useEffect(() => {
  //   setItemsInCart(cart.lines.length);
  // }, [cart.lines.length]);

  // console.log("store: " + cartItemsNum);
  // console.log("state: " + itemsInCart);
  // console.log("cart nodes: " + cart.lines.length);

  // dispatch(updateCartCount({ key: "items in cart", value: itemsInCart }));

  return (
    <div
      id="cart"
      className="closed h-full absolute bg-white min-w-1/4 z-30 max-w-sm"
    >
      <div
        className="flex flex-row items-start pb-10 shadow w-full py-5 px-10"
        onClick={closeCart}
      >
        <button className="text-md bg-slate-400 rounded py-1 px-2 hover:bg-slate-300">
          Close
        </button>
      </div>
      <div className="py-5 px-10">
        <h3 className="pb-3 mb-7 border-b border-black text-lg font-semibold ">
          Your Cart
        </h3>
        {cart.lines.length > 0 ? (
          <>
            <ul>
              {cart.lines.map(({ node: item }) => (
                <li
                  key={item.merchandise?.product?.title}
                  className="py-4 border-b"
                >
                  <p>
                    {item.merchandise?.product?.title} -{" "}
                    {item.merchandise?.title}
                  </p>
                  <p className="text-xs">Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p>Total: {cost === 0 ? "FREE" : `$${cost}`}</p>
            </div>
            <a
              href={`${cart.checkoutUrl}`}
              className="bg-yellow-500 py-1 px-2 rounded hover:bg-yellow-600 mt-4 block max-w-max text-lg"
            >
              Check out
            </a>
            <button onClick={emptyCart} className="text-sm underline">
              Empty your cart
            </button>
          </>
        ) : (
          <p className="text-4xl font-semibold">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
