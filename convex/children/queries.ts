import { ConvexError } from "convex/values";
import { zTeacherQuery } from "../zod";
import { FullChild } from "./types";
import { Group } from "../groups/types";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getChildren = zTeacherQuery({
    args: {},
    handler: async (ctx, args) => {
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
    const child = await ctx.db.get(args.id);
    
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