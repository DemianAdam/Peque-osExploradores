import { UserIdentity } from "convex/server";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { User } from "./types";
import { GenericId } from "convex/values";
export const TOKEN_SUB_CLAIM_DIVIDER = "|";
export async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<User> {
    const identity = await ctx.auth.getUserIdentity();
    console.log("IDENTITY:", identity);

    if (!identity) {
        throw new Error("Unauthenticated");
    }

    return await getUserFromIdentity(identity, ctx);
}

async function getUserFromIdentity(identity: UserIdentity, ctx: QueryCtx | MutationCtx): Promise<User> {
    const userId = getUserIdFromIdentity(identity);
    const user = await ctx.db.get("users", userId);
    if (!user) {
        throw new Error("User not found");
    }
    console.log("CONVEX USER", user);
    return user;
}

function getUserIdFromIdentity(identity: UserIdentity) {
    const [userId] = identity.subject.split(TOKEN_SUB_CLAIM_DIVIDER);
    return userId as GenericId<"users">;
}