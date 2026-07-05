
import { zTeacherMutation } from "../zod";
import { createGroupValidator, deleteGroupValidator, updateGroupValidator } from "./validators";

export const createGroup = zTeacherMutation({
    args: createGroupValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.query("groups").withIndex("index_name", (q) => q.eq("name", args.name)).unique();
        if (existingGroup) {
            throw new Error(`A Group already exists with name ${args.name}`);
        }
        await ctx.db.insert("groups", args);
    }
});

export const updateGroup = zTeacherMutation({
    args: updateGroupValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.get("groups", args.id);
        if (!existingGroup) {
            throw new Error(`No Group exists with id ${args.id}`);
        }
        await ctx.db.patch("groups", args.id, args);
    }
});

export const deleteGroup = zTeacherMutation({
    args: deleteGroupValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.get("groups", args.id);
        if (!existingGroup) {
            throw new Error(`No Group exists with id ${args.id}`);
        }
        await ctx.db.delete("groups", args.id);
    }
});