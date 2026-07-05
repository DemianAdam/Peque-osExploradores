import { zTeacherQuery } from "../zod";

export const getGroups = zTeacherQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        return await ctx.db.query("groups").collect();
    }
});