import { customMutation, NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod4";
import { internalMutation as rawInternalMutation, internalQuery as rawInternalQuery, internalAction as rawInternalAction, action as rawAction, mutation as rawMutation, query as rawQuery } from "./_generated/server";
import { customCtx } from "convex-helpers/server/customFunctions";
import { triggersDB } from "./triggers";
import { getCurrentTeacher } from "./teachers/functions";

export const zQuery = zCustomQuery(rawQuery, NoOp);
export const zInternalQuery = zCustomQuery(rawInternalQuery, NoOp);
const mutation = customMutation(rawMutation, customCtx(triggersDB));
const internalMutation = customMutation(rawInternalMutation, customCtx(triggersDB));
export const zInternalMutation = zCustomMutation(internalMutation, NoOp);
export const zInternalAction = zCustomAction(rawInternalAction, NoOp);

export const zTeacherQuery = zCustomQuery(rawQuery, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        if (!currentTeacher) {
            throw new Error("No teacher found in context");
        }
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});

export const zTeacherMutation = zCustomMutation(mutation, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        if (!currentTeacher) {
            throw new Error("No teacher found in context");
        }
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});


