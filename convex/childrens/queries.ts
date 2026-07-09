import { ConvexError } from "convex/values";
import { zTeacherQuery } from "../zod";
import { FullChildren } from "./types";
import { Group } from "../groups/types";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getChildrens = zTeacherQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        const childrens = await ctx.db.query("childrens").collect();

        const fullChildrens = await Promise.all(
            childrens.map(async (children) => {

                let group: Group | null = null;
                if (children.groupId) {
                    group = await ctx.db.get("groups", children.groupId);
                }

                const fullChildren: FullChildren = {
                    ...children,
                    group: group,
                };
                return fullChildren;
            })
        );

        return fullChildrens;
    },
});

export const getById = query({
  args: { id: v.id("childrens") },
  handler: async (ctx, args) => {
    const children = await ctx.db.get(args.id);
    
    if (!children) return null;

    // Enriquecemos igual que en la lista
    let group: Group | null = null;
    if (children.groupId) {
      group = await ctx.db.get("groups", children.groupId);
    }

    return {
      ...children,
      group: group,
    };
  },
});