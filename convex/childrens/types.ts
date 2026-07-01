import { Doc } from "../_generated/dataModel";

export type Children = Doc<"childrens">

export type FullChildren = Children & {
    group: string
}