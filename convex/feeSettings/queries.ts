import { zTeacherQuery } from "../zod";
import { FeeSettings } from "./types";

export const getFeeSettings = zTeacherQuery({
    args: {},
    handler: async ({ db }): Promise<FeeSettings | null> => {
        return await db.query("feeSettings").first();
    }
});