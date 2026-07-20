import z from "zod";
import { Doc } from "../_generated/dataModel";
import { Group } from "../groups/types";
import { createChildValidator } from "./validators";

export type Child = Doc<"children">

export type FullChild = Child & {
    group: Group | null
}

export type ChildData = Omit<Child, "_id" | "_creationTime">

export type CreateChildData = z.infer<typeof createChildValidator>

