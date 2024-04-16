import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getCredits : protectedProcedure.query(async ({ctx}) =>{
        const user = await ctx.db.user.findUnique({
            where: {
                id: ctx.session.user.id,
            }
        });
        return user?.balance;
    })
})