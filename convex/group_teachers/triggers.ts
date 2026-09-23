import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "../_generated/dataModel";
import { incrementCount, decrementCount, CounterKeysBuilders } from "../counter";

export function registerGroupTeachersTriggers(triggers: Triggers<DataModel>) {
  triggers.register("group_teachers", async (ctx, change) => {
    if (change.operation === "insert") {
      await incrementCount(ctx, CounterKeysBuilders.teachersInGroup(change.newDoc.groupId));
    } else if (change.operation === "delete") {
      await decrementCount(ctx, CounterKeysBuilders.teachersInGroup(change.oldDoc.groupId));
    }
  });
}
