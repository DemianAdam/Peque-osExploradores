import z from "zod";
import { Doc } from "../_generated/dataModel";
import { accountValidator } from "./validators";

export type User = Doc<"users">;
export type Account = z.Infer<typeof accountValidator>