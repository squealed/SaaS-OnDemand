import { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"
import { env } from "~/env"
import {buffer} from "micro"
import { db } from "../../server/db";

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)
export const config = {
    api: {
        bodyParser: false,
    },
}
const webhook = async(req: NextApiRequest, resp: NextApiResponse) => {
    if(req.method === "POST"){
        const buff = await buffer(req)
        const sig = req.headers["stripe-signature"]
        let event
        try {
            event = stripe.webhooks.constructEvent(
                buff,
              sig as string,
              env.STRIPE_WEBHOOK_SECRET
            );
          } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err);
            return resp.status(400);
          }
        if(event.type === "checkout.session.completed"){
            const checkoutSessionCompleted = event.data.object as unknown as {
                id: string,
                amount_total: number,
                metadata: {
                    userId: string,
                }
            }
            await db.user.update({
                where: {
                    id: checkoutSessionCompleted.metadata.userId
                },
                data:{
                    balance: {
                        increment: checkoutSessionCompleted.amount_total/100
                    }
                }
            })
        }
        resp.status(200)
    }else{
        resp.status(405)
    }
}
export default webhook