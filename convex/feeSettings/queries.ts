import { zTeacherQuery } from "../zod";
import { FeeSettings } from "./types";
import { getCurrentFeeSettings } from "./functions";

export const getFeeSettings = zTeacherQuery({
    args: {},
    handler: async (ctx): Promise<FeeSettings | null> => {  
        try {
            return await getCurrentFeeSettings(ctx);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});