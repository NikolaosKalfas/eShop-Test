import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Product = ({ pageContext }) => {
  const { product } = pageContext;
  const [variantId, setVariantId] = useState(product.variants[0].storefrontId);

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
      body: JSON.stringify({
        cartId: localCartData.cartId,
        variantId: variantId,
      }),
    });

    if (!result.ok) {
      console.error("There was a problem adding the item to the cart");
      return;
    }

    // set cart status so it updates
    window.localStorage.setItem("eShop-test:status", "dirty");
  };

  const setId = (e) => {
    setVariantId(e.target.value);
  };

  console.log(product);

  return (
    <Layout title={product.title} description={product.description}>
      <div className="grid md:grid-cols-2 gap-4 my-20 mx-10">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          className="mySwiper w-full"
        >
          {product.images.map((image) => (
            <SwiperSlide className="text-center">
              <GatsbyImage
                image={image.localFile.childImageSharp.gatsbyImageData}
                alt={product.title}
                className=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="product-description md:w-4/6 mt-20">
          <h1 className="text-5xl font-semibold mb-2">{product.title}</h1>
          <div className="flex flex-row">
            {product.tags.map((tag) => (
              <p className="mr-2 bg-gray-200 rounded p-1 text-xs" key={tag}>
                {tag}
              </p>
            ))}
          </div>
          <div className="py-5 border-b">
            <p className="font-semibold text-3xl">
              {product.priceRangeV2.minVariantPrice.amount}{" "}
              {product.priceRangeV2.minVariantPrice.currencyCode}
            </p>
          </div>
          <p className="text-2xl my-10">{product.description}</p>

          {product.variants && product.variants.length > 1 && (
            <select
              name="variantIds"
              className="block border border-black rounded my-2 cursor-pointer"
              onChange={setId}
              value={variantId}
            >
              {product.variants.map((variant) => (
                <option
                  value={variant.storefrontId}
                  key={variant.storefrontId}
                  label={variant.title}
                ></option>
              ))}
            </select>
          )}
          <button
            className="bg-yellow-500 py-1 px-2 rounded hover:bg-yellow-600"
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
