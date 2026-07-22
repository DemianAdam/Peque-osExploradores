import { Group } from "../groups/types";
import { zQuery } from "../zod";
import { getCurrentTeacher as getTeacherFunction } from "./functions";
import { FullTeacher } from "./types";

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

export const getTeachers = zQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        const teachers = await ctx.db.query("teachers").collect();

        const fullTeachers : FullTeacher[] = await Promise.all(
            teachers.map(async (teacher) => {
                const allGroupsIds = await ctx.db.query("group_teachers")
                    .withIndex("index_teacher", (q) => q.eq("teacherId", teacher._id))
                    .collect();

                const groups = await Promise.all(
                    allGroupsIds.map(async (gt) => {
                        const group : Group | null = await ctx.db.get("groups", gt.groupId);
                        if (!group) {
                            throw new Error(`Group ${gt.groupId} not found`);
                        }
                        return group;
                    })
                );

                return {
                    ...teacher,
                    groups
                };
            }))

        return fullTeachers;
    }
});