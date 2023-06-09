/* Runs on Server */
import { type User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// a publicProcedure generates the function that the client calls

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl
  }
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100
    })).map(filterUserForClient)

    return posts.map((post) => {
      const author = users.find(user => user.id === post.authorId);
      if (!author || !author.username) { // force username check to be a string @TS
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Post Author Not Found"
        })
      }
      return {
        post,
        author: { ...author, username: author.username } // forces username to be a string
      }
    });
  })
});
