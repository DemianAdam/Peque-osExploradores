import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "../_generated/dataModel";

export function registerGroupsTriggers(triggers: Triggers<DataModel>) {
  triggers.register("groups", async (ctx, change) => {
    if (change.operation === "delete") {
      const oldDoc = change.oldDoc;
      const anyActiveChildrenInGroup = await ctx.db.query("children")
        .withIndex("index_group_active", (q) =>
          q.eq("groupId", oldDoc._id).eq("active", true))
        .unique();

      if (anyActiveChildrenInGroup) {
        throw new Error(`Cannot delete group with id ${oldDoc._id} because it has associated children.`);
      }

      const groupTeachersQuery = ctx.db.query("group_teachers")
        .withIndex("index_group", (q) => q.eq("groupId", oldDoc._id));

      for await (const groupTeacher of groupTeachersQuery) {
        await ctx.db.delete("group_teachers", groupTeacher._id);
      }
    }
  });
}
