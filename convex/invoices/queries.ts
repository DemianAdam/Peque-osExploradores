import { zTeacherQuery } from "../zod";

export const getInvoices = zTeacherQuery({
    args:{},
    async handler(ctx) {
        //TODO: Paginate
        return await ctx.db.query("invoices").collect();
    },
});