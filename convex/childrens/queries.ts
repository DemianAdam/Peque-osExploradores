import { ConvexError } from "convex/values";
import { zTeacherQuery } from "../zod";
import { FullChildren } from "./types";
import { Group } from "../groups/types";

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