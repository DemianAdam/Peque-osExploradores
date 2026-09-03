import { ConvexError } from "convex/values";
import { zTeacherMutation } from "../zod";
import { createChildValidator, deleteChildValidator, updateChildValidator } from "./validators";
import { getCurrentOpenPayslip } from "../payslips/functions";
import { getCurrentFeeSettings } from "../feeSettings/functions";


export const createChild = zTeacherMutation({
    args: createChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.query("children").withIndex("index_dni", (q) => q.eq("dni", args.dni)).unique();
        if (existingChild) {
            throw new ConvexError(`A Child already exists with DNI ${args.dni}`);
        }
        const newChild = {
            ...args,
            active: true
        }
        const id = await ctx.db.insert("children", newChild);

        const currentPayslip = await getCurrentOpenPayslip(ctx);
        const feeSettings = await getCurrentFeeSettings(ctx);

        if (currentPayslip) {
            await ctx.db.insert("fees", {
                totalAmount: feeSettings.feeAmount,
                state: "pending",
                childId: id,
                payslipId: currentPayslip._id
            });
        }
    }
})

export const updateChild = zTeacherMutation({
    args: updateChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("children", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Child exists with id ${args.id}`);
        }

        const { id, groupId, active, ...rest } = args;
        await ctx.db.patch("children", id, {
            ...rest,
            groupId: active === false ? null : groupId,
            active,
        });
    }
})

export const deleteChild = zTeacherMutation({
    args: deleteChildValidator,
    handler: async (ctx, args) => {
        const existingChild = await ctx.db.get("children", args.id);
        if (!existingChild) {
            throw new ConvexError(`No Child exists with id ${args.id}`);
        }
        await ctx.db.patch("children", args.id, { active: false, groupId: null })
    }
})