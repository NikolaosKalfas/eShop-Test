export async function sendShopifyStorefrontRequest({ query, variables }) {
  const result = await fetch(
    "https://nikolaoskalfas1989.myshopify.com/api/2021-10/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "a9bc2ffccdf1ca05c5f13102b1daf332",
      },
      body: JSON.stringify({ query, variables }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return result;
}

export async function handler() {
  const data = await sendShopifyStorefrontRequest({
    query: `
      mutation CreateCart {
        cartCreate {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {},
  });

  if (!data) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong when creating the cart.",
      }),
    };
  }

  return {
    statusCode: 200,
    body: {
      cartId: data.data.cartCreate?.cart?.id,
      checkoutUrl: data.data.cartCreate?.cart?.checkoutUrl,
    },
  };
}
