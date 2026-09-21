import { subscribeTrigger } from "../triggers";
import { incrementCount, decrementCount, CounterKeysBuilders } from "../counter";

subscribeTrigger("children", {
  insert: async (ctx, { newDoc }) => {
    if (newDoc.active) {
      await incrementCount(ctx, CounterKeysBuilders.activeChildren());
    }
    if (newDoc.active && newDoc.groupId) {
      await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(newDoc.groupId));
    }
  },
  update: async (ctx, { oldDoc, newDoc }) => {
    const wasActive = oldDoc.active;
    const isActive = newDoc.active;

    if (!wasActive && isActive) {
      await incrementCount(ctx, CounterKeysBuilders.activeChildren());
    } else if (wasActive && !isActive) {
      await decrementCount(ctx, CounterKeysBuilders.activeChildren());
    }

    const wasCounted = oldDoc.active && oldDoc.groupId;
    const isCounted = newDoc.active && newDoc.groupId;

    if (wasCounted && !isCounted) {
      await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(oldDoc.groupId!));
    } else if (!wasCounted && isCounted) {
      await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(newDoc.groupId!));
    } else if (wasCounted && isCounted && oldDoc.groupId !== newDoc.groupId) {
      await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(oldDoc.groupId!));
      await incrementCount(ctx, CounterKeysBuilders.childrenInGroup(newDoc.groupId!));
    }
  },
  delete: async (ctx, { oldDoc }) => {
    if (oldDoc.active) {
      await decrementCount(ctx, CounterKeysBuilders.activeChildren());
    }
    if (oldDoc.active && oldDoc.groupId) {
      await decrementCount(ctx, CounterKeysBuilders.childrenInGroup(oldDoc.groupId));
    }
  },
});
