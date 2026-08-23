import { FullFee } from "../../convex/fees/types";

export function formatFeeLabel(fee: FullFee): string {
    return `${fee.startedAt} - (${fee.child.name})`;
}
