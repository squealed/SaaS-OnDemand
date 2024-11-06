import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
export const generateRouter = createTRPCRouter({
    generateImage : protectedProcedure.input(
        z.object({
            image: z.string()
        })
    ).mutation(async ({ctx, input}) =>{
      try{
        await ctx.db.user.updateMany({
          where: {
            id: ctx.session.user.id,
            balance: {
              gte: 1,
            },
          },
          data: {
            balance: {
              decrement: .5,
            }
          }
        })
        const options = {
          method: 'POST',
          url: 'https://modelslab.com/api/v6/realtime/img2img',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            key: process.env.OPENAI_API_KEY,
            base64: true,
            instant_response: true,
            prompt: "Turn this image and its attributes into a cartoon",
            negative_prompt: "bad quality",
            init_image: input.image,
            width: "512",
            height: "512",
            samples: "1",
            temp: false,
            safety_checker: false,
            strength: 0.7,
            seed: null,
            webhook: null,
            track_id: null
          }
        };

        let response = await axios(options)


        await new Promise((resolve) => setTimeout(resolve, 3 * 1000));

        if (response.data.status === "processing"){

          console.log(response.data.future_links[0])
          let link = response.data.future_links[0]
          console.log(link)

          let base64data = await axios.get(link)

          console.log(base64data.data)
          return base64data.data;

        }

      }catch(err){
        return {
          message: "fail"
        }
      }
    })
})