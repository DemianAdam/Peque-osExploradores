import { zTeacherQuery } from "../zod";
import { toFullFee } from "../fees/queries";
import { FullPayment } from "./types";

export const getPayments = zTeacherQuery({
    args:{},
    async handler(ctx) {
        //TODO: Paginate
        const payments = await ctx.db.query("payments").collect();

        const fullPayments = await Promise.all(payments.map(async (payment) => {
            const fee = await ctx.db.get("fees", payment.feeId);
            const teacher = await ctx.db.get("teachers", payment.teacherId);

            const fullFee = fee ? await toFullFee(ctx.db, fee) : null;
            return { ...payment, fee: fullFee, teacher };
        }));

        return fullPayments.filter(
            (payment): payment is FullPayment =>
                payment.fee !== null && payment.teacher !== null
        );
    }
});
