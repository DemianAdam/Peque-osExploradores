import { MutationCtx } from "../_generated/server";
import { getActiveChildren } from "../children/functions";
import { getCurrentOpenPayslip } from "../payslips/functions";



export async function createCurrentFees(ctx: MutationCtx, feeAmount: number) {
    const activeChildren = await getActiveChildren(ctx);
    const currentPayslip = await getCurrentOpenPayslip(ctx);
    if(!currentPayslip){
        throw new Error("Cannot create Fees without a payslip");
    }

    for (const child of activeChildren) {
        await ctx.db.insert("fees", {
            totalAmount: feeAmount,
            state: "pending",
            childId: child._id,
            payslipId: currentPayslip._id
        });
    }
}
