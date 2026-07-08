import { Doc } from "../_generated/dataModel";
import { Group } from "../groups/types";

export type Teacher = Doc<"teachers">

export type FullTeacher = Teacher & {
    groups: Group[]
}