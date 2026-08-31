import { FullFee } from "../../../convex/fees/types";
import { formatPeriod } from "@utils/dates"; 

export function formatFeeLabel(fee: FullFee): string {
    const periodText = fee.startedAt ? formatPeriod(fee.startedAt) : "Período desconocido";
    return `${periodText} - (${fee.child.name})`;
}