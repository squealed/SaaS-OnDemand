import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import Stripe from "stripe"
import { env } from "~/env.js";
import { z } from "zod"

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)

export const checkoutRouter = createTRPCRouter({
  createCheckout : protectedProcedure.input(
    z.object({
      price: z.number().min(1, "Price must be at least 1 cent"), // Use cents to avoid decimals
    })
    ).mutation(async ({ctx, input}) =>{
      return stripe.checkout.sessions.create({
        payment_method_types: ["card", "cashapp", "us_bank_account"],
        metadata: {
          userId: ctx.session.user.id,
        },
        success_url: `${env.NEXTAUTH_URL}`,
        cancel_url: `${env.NEXTAUTH_URL}`,
        line_items: [
          {
            price_data: {
              currency: "usd", // Specify currency
              product_data: {
                name: "Custom Product",
              },
              unit_amount: input.price, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment"
      })
  })
})