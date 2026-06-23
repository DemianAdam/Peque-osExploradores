import { zQuery } from "../zod";
import { getCurrentTeacher as getTeacherFunction } from "./functions";

export const getCurrentTeacher = zQuery({
    args: {},
    handler: async (ctx, args) => {
        let currentTeacher;
        try {
            currentTeacher = await getTeacherFunction(ctx);
        } catch (error) {
            currentTeacher = null;
        }

        console.log("Current Teacher:", currentTeacher);    
        return currentTeacher;
    }
})