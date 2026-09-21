import { zTeacherQuery } from "../zod";

export const getInvoices = zTeacherQuery({
    args:{},
    async handler(ctx) {
        //TODO: Paginate
        return await ctx.db.query("invoices").collect();
    },
});

export const getDashboardStats = zTeacherQuery({
    args: {},
    async handler(ctx) {
        const invoices = await ctx.db.query("invoices").collect();

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const currentMonthName = now.toLocaleString('es', { month: 'long' });
        const periodLabel = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1) + ` ${currentYear} (Abierto)`;

        const currentMonthInvoices = invoices.filter(inv => {
            const invDate = new Date(inv.date || inv._creationTime);
            return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
        });

        const currentTotal = currentMonthInvoices.reduce((acc, inv) => acc + inv.amount, 0);

        const categoryMap: { [key: string]: number } = {};
        currentMonthInvoices.forEach(inv => {
            const cat = inv.description || "Varios";
            categoryMap[cat] = (categoryMap[cat] || 0) + inv.amount;
        });

        const categories = Object.keys(categoryMap).length > 0
            ? Object.entries(categoryMap).map(([name, amount]) => ({
                name,
                amount,
                percentage: currentTotal > 0 ? Math.round((amount / currentTotal) * 100) : 0,
              }))
            : [
                { name: "Sin gastos registrados", amount: 0, percentage: 100 }
              ];

        const annualData = Array.from({ length: 5 }, (_, i) => {
            const d = new Date(currentYear, currentMonth - (4 - i), 1);
            const monthName = d.toLocaleString('es', { month: 'short' });
            const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
            
            const m = d.getMonth();
            const y = d.getFullYear();

            const monthInvs = invoices.filter(inv => {
                const invDate = new Date(inv.date || inv._creationTime);
                return invDate.getMonth() === m && invDate.getFullYear() === y;
            });

            const total = monthInvs.reduce((acc, inv) => acc + inv.amount, 0);
            return { month: capitalized, total };
        });

        return {
            periodLabel,
            currentTotal,
            categories,
            annualData,
        };
    },
});