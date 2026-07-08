import { zTeacherMutation } from "../zod";
import { setGroupTeachersValidator } from "./validators";

export const setGroupTeachers = zTeacherMutation({
    args: setGroupTeachersValidator,
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("group_teachers")
            .withIndex("index_group", (q) => q.eq("groupId", args.groupId))
            .collect();

        await Promise.all(existing.map((gt) => ctx.db.delete("group_teachers", gt._id)));

        await Promise.all(args.teacherIds.map((teacherId) =>
            ctx.db.insert("group_teachers", { teacherId, groupId: args.groupId })
        ));
    }
});
