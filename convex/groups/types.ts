import { Doc } from "../_generated/dataModel";
import { Child } from "../children/types";
import { Teacher } from "../teachers/types";

export type Group = Doc<"groups">

export type FullGroup = Group & {
    children: Child[],
    teachers: Teacher[]
}

