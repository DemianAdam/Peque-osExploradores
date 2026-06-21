import { createAccount } from "@convex-dev/auth/server";
import { zInternalMutation } from "../zod";
import { accountValidator } from "../users/validators";
import z from "zod";

export const createTeacher = zInternalMutation({
    args: accountValidator.extend({ name: z.string() }),
    handler: async (ctx, args) => {
        const account = await createAccount(ctx as any, {
            provider: "password",
            account: {
                id: args.username,
                secret: args.password
            },
            profile: {
                username: args.username
            },
            shouldLinkViaEmail: false,
            shouldLinkViaPhone: false
        })

        await ctx.db.insert("teachers", {
            name: args.name,
            userId: account.user._id
        })
    }
});