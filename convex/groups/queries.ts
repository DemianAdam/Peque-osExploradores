import { query } from "../_generated/server";
import { Child } from "../children/types";
import { Teacher } from "../teachers/types";
import { zTeacherQuery } from "../zod";
import { FullGroup } from "./types";

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

    const fullGroups: FullGroup[] = await Promise.all(
      groups.map(async (group) => {
        const children: Child[] = await ctx.db
          .query("children")
          .withIndex("index_group_active", (q) => q.eq("groupId", group._id))
          .collect();

        const groupTeachers = await ctx.db
          .query("group_teachers")
          .withIndex("index_group", (q) => q.eq("groupId", group._id))
          .collect();

        const teachers: Teacher[] = (
          await Promise.all(
            groupTeachers.map((gt) => ctx.db.get("teachers", gt.teacherId))
          )
        ).filter((t) => t !== null);

        return {
          ...group,
          children,
          teachers,
        };
      })
    );
    return fullGroups;
  },
});
