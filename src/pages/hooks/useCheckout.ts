import { loadStripe } from "@stripe/stripe-js"
import { env } from "~/env.js"
import { api } from "~/utils/api"


const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUB_KEY)
export function useCheckout(){
    const checkout = api.checkout.createCheckout.useMutation()

    return {
        buyCredits: async (price: number) => {
            const response = await checkout.mutateAsync({price})
            const stripe = await stripePromise
            await stripe?.redirectToCheckout({
                sessionId: response.id
            })
        }
    }
}