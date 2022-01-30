module.exports = {
  siteMetadata: {
      title: `eShop - Test`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-shopify',
    options: {
      "shopName": "\u0016",
      "accessToken": "\u0016"
    }
  }]
};