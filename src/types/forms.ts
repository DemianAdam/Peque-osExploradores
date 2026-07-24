import type { Id } from "../../convex/_generated/dataModel";

export interface ChildFormData {
  name: string;
  groupId: Id<"groups"> | null;
  dni: string;
  active: boolean;
}

export interface GroupFormData {
  name: string;
  teacherIds: Id<"teachers">[];
}

export interface InvoicesFormData {
  description: string;
  amount: number | string;
  date: string;
}
