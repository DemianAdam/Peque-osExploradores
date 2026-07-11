import { query } from "../_generated/server";
import { zTeacherQuery } from "../zod";

export const getGroups = zTeacherQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        return await ctx.db.query("groups").collect();
    }
});

export const getAllGroupTeachers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("group_teachers").collect();
  },
});