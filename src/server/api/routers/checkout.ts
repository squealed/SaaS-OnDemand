import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import stripe from "stripe"
import axios from "axios"
import prisma from "@prisma/client";
import { z } from "zod"
export const checkoutRouter = createTRPCRouter({
    generateImage : protectedProcedure.input(
        z.object({
            amount: z.string(),
        })
    ).mutation(async ({ctx, input}) =>{
        /*
        let count = await ctx.db.user.updateMany({
          where: {
            id: ctx.session.user.id,
            balance: {
              gte: 1,
            },
          },
          data: {
            balance: {
              decrement: 1,
            }
          }
        })
        */
        console.log("We are here", )
        /*
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: input.prompt,
            image: input.image,  // Use the base64 image directly in the payload
          }, {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          */
        //console.log(response.data)
        return {
            message: "success"
        }
    })
})