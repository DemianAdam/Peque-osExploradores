import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "../_generated/dataModel";

export function registerTeachersTriggers(triggers: Triggers<DataModel>) {
  triggers.register("teachers", async (ctx, change) => {
    if (change.operation === "delete") {
      const oldDoc = change.oldDoc;
      const groupTeachersQuery = ctx.db.query("group_teachers")
        .withIndex("index_teacher", (q) => q.eq("teacherId", oldDoc._id));

      for await (const gt of groupTeachersQuery) {
        await ctx.db.delete("group_teachers", gt._id);
      }
    }
  });
}
