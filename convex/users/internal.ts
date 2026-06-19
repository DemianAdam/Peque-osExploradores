import { createAccount } from "@convex-dev/auth/server";
import { zInternalAction } from "../zod";
import { accountValidator } from "./validators";

export const createUserInternal = zInternalAction({
    args: accountValidator,
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

    }
});