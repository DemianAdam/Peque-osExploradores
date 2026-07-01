import { ConvexError } from "convex/values";
import { zTeacherMutation } from "../zod";
import { createChildrenValidator } from "./validators";

export const createChildren = zTeacherMutation({
    args: createChildrenValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.query("childrens").withIndex("index_dni", (q) => q.eq("dni", args.dni)).unique();
        if (existingChild) {
            throw new ConvexError(`A Children already exists with DNI ${args.dni}`);
        }
        const newChildren = {
            ...args,
            active: true
        }
        await ctx.db.insert("childrens", newChildren);
    }
})