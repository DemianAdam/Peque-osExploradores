import { Id } from "../_generated/dataModel";
import { Child } from "../children/types";
import { Teacher } from "../teachers/types";
import { zTeacherQuery } from "../zod";
import { FullGroup } from "./types";

export const getGroups = zTeacherQuery({
  args: {},
  handler: async (ctx, args) => {
    //TODO: Paginate
    return await ctx.db.query("groups").collect();
  }
});

export const getFullGroups = zTeacherQuery({
  args: {},
  handler: async (ctx) => {
    //TODO: Paginate
    const groups = await ctx.db.query("groups").collect();

    const [allChildren, allGroupTeachers] = await Promise.all([
      ctx.db.query("children").collect(),
      ctx.db.query("group_teachers").collect(),
    ]);

    const childrenByGroup = new Map<Id<"groups">, Child[]>();
    for (const child of allChildren) {
      if (child.groupId) {
        const arr = childrenByGroup.get(child.groupId) ?? [];
        arr.push(child);
        childrenByGroup.set(child.groupId, arr);
      }
    }

    const teacherIds = [...new Set(allGroupTeachers.map(gt => gt.teacherId))];
    const allTeachers = await Promise.all(
      teacherIds.map(id => ctx.db.get("teachers", id))
    );
    const teacherMap = new Map(
      allTeachers.filter((t): t is Teacher => t !== null).map(t => [t._id, t])
    );

    const teachersByGroup = new Map<Id<"groups">, Teacher[]>();
    for (const gt of allGroupTeachers) {
      const teacher = teacherMap.get(gt.teacherId);
      if (teacher) {
        const arr = teachersByGroup.get(gt.groupId) ?? [];
        arr.push(teacher);
        teachersByGroup.set(gt.groupId, arr);
      }
    }

    return groups.map(group => ({
      ...group,
      children: childrenByGroup.get(group._id) ?? [],
      teachers: teachersByGroup.get(group._id) ?? [],
    }));
  },
});
