import { ConvexError } from "convex/values";
import { zTeacherMutation } from "../zod";
import { createChildValidator, deleteChildValidator, updateChildValidator } from "./validators";

export const createChild = zTeacherMutation({
    args: createChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.query("children").withIndex("index_dni", (q) => q.eq("dni", args.dni)).unique();
        if (existingChild) {
            throw new ConvexError(`A Child already exists with DNI ${args.dni}`);
        }
        const newChild = {
            ...args,
            active: true
        }
        await ctx.db.insert("children", newChild);
    }
})

export const updateChild = zTeacherMutation({
    args: updateChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("children", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Child exists with id ${args.id}`);
        }

        const updatedChild = {
            name: args.name,
            dni: args.dni,
            groupId: args.active === false ? null : args.groupId,
            active: args.active
        }

        await ctx.db.patch("children", args.id, updatedChild);
    }
})

export const deleteChild = zTeacherMutation({
    args: deleteChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("children", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Child exists with id ${args.id}`);
        }
        await ctx.db.patch("children", args.id, { active: false, groupId: null })
    }
})