import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { groupTeacherValidator } from "./validators";

const schema = zodOutputToConvex(groupTeacherValidator);

export const groupTeacherSchema = defineTable(schema)
    .index("index_group", ["groupId"])
    .index("index_teacher", ["teacherId"])
    .index("index_group_teacher",["groupId","teacherId"])