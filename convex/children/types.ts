import z from "zod";
import { Doc } from "../_generated/dataModel";
import { Group } from "../groups/types";
import { createChildValidator } from "./validators";
import { TypeData } from "../common/types";

export type Child = Doc<"children">

export type FullChild = Child & {
    group: Group | null
}

export type ChildData = TypeData<Child>

export type CreateChildData = z.infer<typeof createChildValidator>

