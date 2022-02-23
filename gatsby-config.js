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
        storeUrl: "nikosteststore.myshopify.com",
        shopName: "nikosteststore",
        password: "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",
        accessToken: "142f4c3b2d954a00027246a69d5bade1",
        downloadImages: true,
        apiVersion: "2020-01",
        includeCollections: ["shop"],
      },
    },
    "gatsby-plugin-postcss",
  ],
};
