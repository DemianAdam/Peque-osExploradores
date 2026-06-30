import { ConvexError } from "convex/values";
import { zTeacherQuery } from "../zod";
import { FullChildren } from "./types";

export const getChildrens = zTeacherQuery({
    args: {},
    handler: async (ctx, args) => {
        //TODO: Paginate
        const childrens = await ctx.db.query("childrens").collect();

        const fullChildrens = await Promise.all(
            childrens.map(async (children) => {
                const group = await ctx.db.get(children.groupId);

                if (!group) {
                    throw new ConvexError("Group of children doesn't exist");
                }

                const fullChildren: FullChildren = {
                    ...children,
                    group: group.name,
                };
                return fullChildren;
            })
        );

        return fullChildrens;
    },
});