import { ConvexError } from "convex/values";
import { zTeacherMutation } from "../zod";
import { createChildrenValidator, deleteChildrenValidator, updateChildrenValidator } from "./validators";

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

export const updateChildren = zTeacherMutation({
    args: updateChildrenValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("childrens", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Children exists with id ${args.id}`);
        }

        const updatedChild ={
            ...args,
            groupId: args.active === false ? null : args.groupId
        }

        await ctx.db.patch("childrens", args.id, updatedChild);
    }
})

export const deleteChildren = zTeacherMutation({
    args: deleteChildrenValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("childrens", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Children exists with id ${args.id}`);
        }
        await ctx.db.patch("childrens", args.id, { active: false, groupId: null })
    }
})