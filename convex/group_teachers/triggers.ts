import { InsertOperation, DeleteOperation } from "../triggers";
import { incrementCount, decrementCount, CounterKeysBuilders } from "../counter";

export const groupTeacherTriggers: {
  insert: InsertOperation<"group_teachers">;
  delete: DeleteOperation<"group_teachers">;
} = {
  insert: async (ctx, { newDoc }) => {
    await incrementCount(ctx, CounterKeysBuilders.teachersInGroup(newDoc.groupId));
  },
  delete: async (ctx, { oldDoc }) => {
    await decrementCount(ctx, CounterKeysBuilders.teachersInGroup(oldDoc.groupId));
  },
};
