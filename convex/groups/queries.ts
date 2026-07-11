import { query } from "../_generated/server";
import { zTeacherQuery } from "../zod";

export const getGroups = zTeacherQuery({
  args: {},
  handler: async (ctx, args) => {
    //TODO: Paginate
    return await ctx.db.query("groups").collect();
  }
});

export const getFullGroups = zTeacherQuery({
  args: {},
  handler: async (ctx) => {
    //TODO: Paginate
    const groups = await ctx.db.query("groups").collect();

    return await Promise.all(
      groups.map(async (group) => {
        const children = await ctx.db
          .query("children")
          .withIndex("index_group_active", (q) => q.eq("groupId", group._id))
          .collect();

        const groupTeachers = await ctx.db
          .query("group_teachers")
          .withIndex("index_group", (q) => q.eq("groupId", group._id))
          .collect();

        const teachers = await Promise.all(
          groupTeachers.map((gt) => ctx.db.get("teachers", gt.teacherId))
        );

        return {
          ...group,
          children,
          teachers: teachers.filter(Boolean),
          childrenCount: children.length,
          teachersCount: groupTeachers.length,
        };
      })
    );
  },
});

export const getAllGroupTeachers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("group_teachers").collect();
  },
});