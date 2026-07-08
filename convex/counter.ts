import { components } from "./_generated/api";
import { ShardedCounter } from "@convex-dev/sharded-counter";
const counter = new ShardedCounter(components.shardedCounter);

export const COUNTER_KEYS = {
    childrensPerGroup: "childrensPerGroup",
    teachersPerGroup: "teachersPerGroup",
} as const;

type CounterKeys = (typeof COUNTER_KEYS)[keyof typeof COUNTER_KEYS];

export function getCounter(key: CounterKeys) {
    return counter.for(key)
}