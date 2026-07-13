import { createAccount } from "@convex-dev/auth/server";
import { zInternalAction } from "../zod";
import { accountValidator } from "../users/validators";
import { zInternalMutation } from "../zod";
import { teacherValidator } from "./validators";
import z from "zod";
import { internal } from "../_generated/api";

export const createTeacher = zInternalAction({
    args: accountValidator.extend({ name: z.string() }),
    handler: async (ctx, args) => {
        const account = await createAccount(ctx, {
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

        await ctx.runMutation(internal.teachers.internal.createRecord, {
            name: args.name,
            userId: account.user._id
        })
    }
});

export const createRecord = zInternalMutation({
    args: teacherValidator,
    handler: async (ctx, args) => {
        await ctx.db.insert("teachers", args);
    },
});
