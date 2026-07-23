import { zTeacherQuery } from "../zod";

export const getInvoices = zTeacherQuery({
    args:{},
    async handler(ctx, args) {
        //TODO: Paginate
        return await ctx.db.query("invoices").collect();
    },
});