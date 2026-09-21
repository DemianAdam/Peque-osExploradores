import { zTeacherQuery } from "../zod";
import { FullChild } from "./types";
import { Group } from "../groups/types";
import { query } from "../_generated/server";
import { v } from "convex/values";
import { getCount, CounterKeysBuilders } from "../counter";

export const getActiveChildrenCount = zTeacherQuery({
    args: {},
    handler: async (ctx) => {
        return await getCount(ctx, CounterKeysBuilders.activeChildren());
    },
});

export const getDashboardStats = zTeacherQuery({
    args: {},
    handler: async (ctx) => {
        const activeCount = await getCount(ctx, CounterKeysBuilders.activeChildren());
        const children = await ctx.db.query("children").collect();

        const now = new Date();
        const monthsData = Array.from({ length: 5 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (4 - i), 1);
            const monthName = d.toLocaleString('es', { month: 'short' });
            const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
            
            const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime();
            const count = children.filter(c => c._creationTime <= endOfMonth).length;

            return { month: capitalized, count };
        });

        return { activeCount, monthsData };
    },
});

export const getChildren = zTeacherQuery({
    args: {},
    handler: async (ctx) => {
        //TODO: Paginate
        const children = await ctx.db.query("children").collect();

        const fullChildren = await Promise.all(
            children.map(async (child) => {

                let group: Group | null = null;
                if (child.groupId) {
                    group = await ctx.db.get("groups", child.groupId);
                }

                const enrichedChild: FullChild = {
                    ...child,
                    group: group,
                };
                return enrichedChild;
            })
        );

        return fullChildren;
    },
});

export const getById = query({
  args: { id: v.id("children") },
  handler: async (ctx, args) => {
    const child = await ctx.db.get("children", args.id);
    
    if (!child) return null;

    let group: Group | null = null;
    if (child.groupId) {
      group = await ctx.db.get("groups", child.groupId);
    }

    return {
      ...child,
      group: group,
    };
  },
});