import { Change, Triggers } from "convex-helpers/server/triggers";
import { DataModel, TableNames } from "./_generated/dataModel";

const triggers = new Triggers<DataModel>();

type TriggerFunction = Parameters<typeof triggers.register>[1];
type TriggerCtx = Parameters<TriggerFunction>[0];

export const triggersDB = triggers.wrapDB;

// 🔑 Keep table generic all the way through
type ChangeByOperation<
  T extends TableNames,
  Op extends Change<DataModel, T>["operation"]
> = Extract<Change<DataModel, T>, { operation: Op }>;

export type InsertOperation<T extends TableNames> = (
  ctx: TriggerCtx,
  args: ChangeByOperation<T, "insert">
) => Promise<void>;

export type UpdateOperation<T extends TableNames> = (
  ctx: TriggerCtx,
  args: ChangeByOperation<T, "update">
) => Promise<void>;

export type DeleteOperation<T extends TableNames> = (
  ctx: TriggerCtx,
  args: ChangeByOperation<T, "delete">
) => Promise<void>;

// 🚀 Main helper (inference happens here)
export function subscribeTrigger<T extends TableNames>(
  tableName: T,
  events: Partial<{
    insert: InsertOperation<T>;
    update: UpdateOperation<T>;
    delete: DeleteOperation<T>;
  }>
) {
  triggers.register(tableName, async (ctx, change) => {
    if (change.operation === "insert") {
      await events.insert?.(ctx, change);
    }

    if (change.operation === "update") {
      await events.update?.(ctx, change);
    }

    if (change.operation === "delete") {
      await events.delete?.(ctx, change);
    }
  });
}