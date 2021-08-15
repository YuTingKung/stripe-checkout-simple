require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  ['1', { priceInCents: 11, name: "Red" }],
  ['2', { priceInCents: 12, name: "Yellow" }],
  ['3', { priceInCents: 13, name: "Blue" }],
  ['4', { priceInCents: 14, name: "Orange" }],
  ['5', { priceInCents: 15, name: "Green" }],
  ['6', { priceInCents: 16, name: "Purple" }],
  ['7', { priceInCents: 17, name: "Gray" }],
  ['8', { priceInCents: 18, name: "Black" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents * 100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/index.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(3000)
