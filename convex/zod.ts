import { customMutation, NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod4";
import { internalMutation as rawInternalMutation, internalQuery as rawInternalQuery, action as rawAction, mutation as rawMutation, query as rawQuery } from "./_generated/server";
import { customCtx } from "convex-helpers/server/customFunctions";
import { triggersDB } from "./triggers";
import { getCurrentTeacher } from "./teachers/functions";


export const zInternalQuery = zCustomQuery(rawInternalQuery, NoOp);
const mutation = customMutation(rawMutation, customCtx(triggersDB));
const internalMutation = customMutation(rawInternalMutation, customCtx(triggersDB));
export const zInternalMutation = zCustomMutation(internalMutation, NoOp);
export const action = zCustomAction(rawAction, NoOp);

export const zUserQuery = zCustomQuery(rawQuery, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});

export const zUserMutation = zCustomMutation(mutation, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});

export const zUserAction = zCustomAction(rawAction, {
    args: {},
    input: async (ctx, args,) => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const currentTeacher = await getCurrentTeacher(ctx as any);
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
})


export const zUserInternalQuery = zCustomQuery(rawInternalQuery, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});

export const zUserInternalMutation = zCustomMutation(rawInternalMutation, {
    args: {},
    input: async (ctx, args) => {
        const currentTeacher = await getCurrentTeacher(ctx);
        return {
            ctx: { teacher: currentTeacher },
            args
        }
    }
});
