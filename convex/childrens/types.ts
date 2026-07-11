import { Doc } from "../_generated/dataModel";
import { Group } from "../groups/types";

export type Children = Doc<"childrens">

export type FullChildren = Children & {
    group: Group | null
}

export type ChildrenData = Omit<Children, "_id" | "_creationTime"> 