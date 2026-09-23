import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "../_generated/dataModel";
import { incrementCount, decrementCount, CounterKeysBuilders } from "../counter";

export function registerChildrenTriggers(triggers: Triggers<DataModel>) {
  triggers.register("children", async (ctx, change) => {
    if (change.operation === "insert") {
      console.log("Trigger insert children: newDoc:", change.newDoc);
      if (change.newDoc.active) {
        await incrementCount(ctx, CounterKeysBuilders.activeChildren());
      }
      if (change.newDoc.active && change.newDoc.groupId) {
        await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.newDoc.groupId));
      }
    } else if (change.operation === "update") {
      const wasActive = change.oldDoc.active;
      const isActive = change.newDoc.active;

      console.log("Trigger update children: wasActive:", wasActive, "isActive:", isActive);

      if (!wasActive && isActive) {
        await incrementCount(ctx, CounterKeysBuilders.activeChildren());
      } else if (wasActive && !isActive) {
        await decrementCount(ctx, CounterKeysBuilders.activeChildren());
      }

      const wasCounted = change.oldDoc.active && change.oldDoc.groupId;
      const isCounted = change.newDoc.active && change.newDoc.groupId;

      if (wasCounted && !isCounted) {
        if (change.oldDoc.groupId) {
          await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.oldDoc.groupId));
        }
      } else if (!wasCounted && isCounted) {
        if (change.newDoc.groupId) {
          await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.newDoc.groupId));
        }
      } else if (wasCounted && isCounted && oldGroupIdChanged(change.oldDoc.groupId, change.newDoc.groupId)) {
        if (change.oldDoc.groupId) {
          await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.oldDoc.groupId));
        }
        if (change.newDoc.groupId) {
          await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.newDoc.groupId));
        }
      }
    } else if (change.operation === "delete") {
      if (change.oldDoc.active) {
        await decrementCount(ctx, CounterKeysBuilders.activeChildren());
      }
      if (change.oldDoc.active && change.oldDoc.groupId) {
        await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(change.oldDoc.groupId));
      }
    }
  });
}

function oldGroupIdChanged(oldId: unknown, newId: unknown) {
  return oldId !== newId;
}
