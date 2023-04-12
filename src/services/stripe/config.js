const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


exports.stripePayment = async (id, amount) =>  {
    let HOST = process.env.HOST
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
              price_data: { 
                  currency: "usd",
                  product_data: {
                      name: `Standard Space`
                  },
                  unit_amount: amount
              },
              quantity: 1 
          },
        ],
        mode: 'payment',
        success_url: `${HOST}/payments/pay/success?payId=${id}`,
        cancel_url: `${HOST}/payments/pay/failed?payId=${id}`
      });   
      return session.url 
}
