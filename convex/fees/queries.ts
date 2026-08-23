import { zTeacherQuery } from "../zod";
import { FullFee, Fee } from "./types";
import { QueryCtx } from "../_generated/server";

export async function toFullFee(db: QueryCtx["db"], fee: Fee): Promise<FullFee | null> {
    const child = await db.get(fee.childId);
    if (!child) return null;

    const payments = await db.query("payments")
        .withIndex("index_fee", (q) => q.eq("feeId", fee._id))
        .collect();

    const paidAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return { ...fee, child, paidAmount };
}

export const getFees = zTeacherQuery({
    args: {},
    handler: async ({ db }) => {
        const fees = await db.query("fees").collect();

        const fullFees = (await Promise.all(fees.map((fee) => toFullFee(db, fee))))
            .filter((fee): fee is FullFee => fee !== null);

        return fullFees;
    }
});

export const getUnpaidFees = zTeacherQuery({
    args: {},
    handler: async ({ db }) => {
        const partialFees = await db
            .query("fees")
            .withIndex("index_state", (q) => q.eq("state", "partial"))
            .collect();

        const pendingFees = await db
            .query("fees")
            .withIndex("index_state", (q) => q.eq("state", "pending"))
            .collect();

        const fullFees = (await Promise.all([...partialFees, ...pendingFees].map((fee) => toFullFee(db, fee))))
            .filter((fee): fee is FullFee => fee !== null);

        return fullFees;
    }
});
