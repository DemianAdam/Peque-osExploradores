import { zQuery } from "../zod";
import { getCurrentTeacher as getTeacherFunction } from "./functions";

export const getCurrentTeacher = zQuery({
    args: {},
    handler: async (ctx, args) => {
        let currentTeacher;
        try {
            currentTeacher = await getTeacherFunction(ctx);
        } catch (error) {
            currentTeacher = null;
        }

        console.log("Current Teacher:", currentTeacher);
        return currentTeacher;
    }
})

export const listTeachers = zQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        const teachers = await ctx.db.query("teachers").collect();

        const fullTeachers = await Promise.all(
            teachers.map(async (teacher) => {
                const allGroupsIds = await ctx.db.query("group_teachers").withIndex("index_teacher", (q) => q.eq("teacherId", teacher._id)).collect();
                const groups = [];
                for (const groupTeacher of allGroupsIds) {
                    const group = await ctx.db.get("groups", groupTeacher.groupId);
                    groups.push(group);
                }
                return {
                    ...teacher,
                    groups
                };
            }))

        return fullTeachers;
    }
});