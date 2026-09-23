import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "./_generated/dataModel";
import { registerChildrenTriggers } from "./children/triggers";
import { registerGroupsTriggers } from "./groups/triggers";
import { registerTeachersTriggers } from "./teachers/triggers";
import { registerGroupTeachersTriggers } from "./group_teachers/triggers";

const triggers = new Triggers<DataModel>();

export const triggersDB = triggers.wrapDB;

registerChildrenTriggers(triggers);
registerGroupsTriggers(triggers);
registerTeachersTriggers(triggers);
registerGroupTeachersTriggers(triggers);
