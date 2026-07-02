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

export const listTeachers = zQuery({
    args: {},
    handler: async (ctx, args) => {
        // Esto trae todos los registros de la tabla 'teachers'
        return await ctx.db.query("teachers").collect();
    }
});