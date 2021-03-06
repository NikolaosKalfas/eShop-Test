import { sendShopifyStorefrontRequest } from `./create-cart.js`

export async function handler(event) {
  const {cartId, variantId } = JSON.parse(event.body)

  const data = await sendShopifyStorefrontRequest({
    query: `
      mutation AddToCart($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      title
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId, variantId }

  })
  
  // console.log("add to cart: " + JSON.stringify(data))

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}