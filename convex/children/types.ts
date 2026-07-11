import { Doc } from "../_generated/dataModel";
import { Group } from "../groups/types";

export type Child = Doc<"children">

export type FullChild = Child & {
    group: Group | null
}

export type ChildData = Omit<Child, "_id" | "_creationTime"> 