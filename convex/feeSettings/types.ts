import { Doc } from "../_generated/dataModel";

export type FeeSettings = Doc<"feeSettings">;

export type FeeSettingsData = {
    feeAmount: number;
    partnerPercentage: number;
    updatedAt: number;
    updatedBy: string;
};