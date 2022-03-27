import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import useShopify from "../helpers/useShopify";
import ProductCard from "../components/ProductCard/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const Product = ({ pageContext }) => {
  const { product } = pageContext;
  const [variantId, setVariantId] = useState(product.variants[0].storefrontId);
  const [currentUrl, setCurrentUrl] = useState("");
  const [hasRelatedProducts, setHasRelatedProducts] = useState(false);

  const relatedProducts = useShopify();

  useEffect(() => {
    relatedProducts.map((relatedProduct) =>
      relatedProduct.node.productType === product.productType &&
      relatedProduct.node.title !== product.title
        ? setHasRelatedProducts(true)
        : null
    );
  }, []);

  console.log("has related products: " + hasRelatedProducts);

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

  // Sets url for social icons
  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    setCurrentUrl(url);
  });

  console.log(product);
  console.log(relatedProducts);

  return (
    <Layout title={product.title} description={product.description}>
      <div className="grid md:grid-cols-2 gap-4 my-20 mx-10">
        <Swiper
          pagination={{ type: "bullets" }}
          navigation={true}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          className="mySwiper w-full"
        >
          {product.images.map((image) => (
            <SwiperSlide className="text-center">
              <GatsbyImage
                image={image.localFile.childImageSharp.gatsbyImageData}
                alt={product.title}
                className="md:w-3/4"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="product-description md:w-4/6 mt-20">
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">
            {product.title}
          </h1>
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
            <div className="flex flex-row text-2xl mt-5">
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
              >
                <i className="fa-brands fa-facebook mr-2"></i>
              </a>
              <a
                href={`https://www.instagram.com/?url={encodeURIComponent(
                  currentUrl
                )}`}
              >
                <i className="fa-brands fa-instagram mr-2"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}`}
              >
                <i className="fa-brands fa-twitter mr-2"></i>
              </a>
            </div>
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
      {hasRelatedProducts ? (
        <div className="m-10 md:mx-20 ">
          <h2 className="text-3xl font-semibold border-b pb-10 mb-10">
            Related products
          </h2>
          <div className="grid md:grid-cols-4 gap-4 ">
            {relatedProducts
              .slice(0, 7)
              .map((relatedProduct) =>
                relatedProduct.node.productType === product.productType &&
                relatedProduct.node.title !== product.title ? (
                  <ProductCard
                    image={
                      relatedProduct.node.images[0].localFile.childImageSharp
                        .gatsbyImageData
                    }
                    imgAlt={relatedProduct.node.title}
                    name={relatedProduct.node.title}
                    tags={relatedProduct.node.tags.map((tag) => tag)}
                    price={
                      relatedProduct.node.priceRangeV2.maxVariantPrice.amount
                    }
                    currency={
                      relatedProduct.node.priceRangeV2.maxVariantPrice
                        .currencyCode
                    }
                    variants={relatedProduct.node.variants}
                    key={relatedProduct.node.title}
                  />
                ) : null
              )}
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Product;
