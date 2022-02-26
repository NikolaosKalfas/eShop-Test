require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `eShop - Test`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: `webp`, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        storeUrl: process.env.SHOPIFY_STOREFRONT_STORE_URL,
        shopName: process.env.SHOPIFY_STOREFRONT_SHOP_NAME,
        password: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        accessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
        downloadImages: true,
        apiVersion: "2020-01",
        includeCollections: ["shop"],
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-netlify",
  ],
};
