import { FullFee } from "../../../convex/fees/types";

export function formatFeeLabel(fee: FullFee): string {
    // TODO KAREN: startedAt se imprime tal cual viene de la BD; definir el formato legible del periodo.
    return `${fee.startedAt} - (${fee.child.name})`;
}
