
import { zTeacherMutation } from "../zod";
import { createGroupValidator, createGroupWithTeachersValidator, deleteGroupValidator, updateGroupValidator } from "./validators";

export const createGroup = zTeacherMutation({
    args: createGroupValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.query("groups").withIndex("index_name", (q) => q.eq("name", args.name)).unique();
        if (existingGroup) {
            throw new Error(`A Group already exists with name ${args.name}`);
        }
        return await ctx.db.insert("groups", args);
    }
});

export const createGroupWithTeachers = zTeacherMutation({
    args: createGroupWithTeachersValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.query("groups").withIndex("index_name", (q) => q.eq("name", args.name)).unique();
        if (existingGroup) {
            throw new Error(`A Group already exists with name ${args.name}`);
        }

        const groupId = await ctx.db.insert("groups", args);

        const existingGroupTeachers = await ctx.db.query("group_teachers")
            .withIndex("index_group", (q) => q.eq("groupId", groupId))
            .collect();

        await Promise.all(existingGroupTeachers.map((gt) => ctx.db.delete("group_teachers", gt._id)));

        await Promise.all(args.teacherIds.map((teacherId) =>
            ctx.db.insert("group_teachers", { teacherId, groupId: groupId })
        ));
    }
});

export const updateGroup = zTeacherMutation({
    args: updateGroupValidator,
    handler: async (ctx, args) => {
        const existingGroup = await ctx.db.get("groups", args.id);
        if (!existingGroup) {
            throw new Error(`No Group exists with id ${args.id}`);
        }
        const { id, ...fields } = args;
        await ctx.db.patch("groups", id, fields);
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