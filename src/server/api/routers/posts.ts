/* Runs on Server */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// a publicProcedure generates the function that the client calls

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  })
});
