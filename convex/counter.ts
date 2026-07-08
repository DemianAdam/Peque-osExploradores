import { ShardedCounter } from "@convex-dev/sharded-counter";
import { components } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const counter = new ShardedCounter<string>(components.shardedCounter);

export const COUNTER_KEYS = {

} as const;

export const CounterKeysBuilders = {
  childrenInGroup: (id: Id<"groups">) => `children:group:${id}` as const,
  teachersInGroup: (id: Id<"groups">) => `teachers:group:${id}` as const,
} as const;

type StaticKey = (typeof COUNTER_KEYS)[keyof typeof COUNTER_KEYS];
type DynamicKey = ReturnType<(typeof CounterKeysBuilders)[keyof typeof CounterKeysBuilders]>;
type CounterKey = StaticKey | DynamicKey;

export async function incrementCount(ctx: MutationCtx, key: CounterKey) {
  await counter.inc(ctx, key);
}

export async function decrementCount(ctx: MutationCtx, key: CounterKey) {
  await counter.dec(ctx, key);
}

export async function getCount(ctx: QueryCtx | MutationCtx, key: CounterKey) {
  return await counter.count(ctx, key);
}
