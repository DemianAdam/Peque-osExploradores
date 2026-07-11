import { subscribeTrigger } from "../triggers";

subscribeTrigger("teachers", {
  delete: async (ctx, { oldDoc }) => {
    const groupTeachersQuery = ctx.db.query("group_teachers")
      .withIndex("index_teacher", (q) => q.eq("teacherId", oldDoc._id));

    for await (const gt of groupTeachersQuery) {
      await ctx.db.delete("group_teachers", gt._id);
    }
  },
});
