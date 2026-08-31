import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export function formatDateForInput(timestamp: number): string {
    return format(new Date(timestamp), "yyyy-MM-dd");
}

export function parseInputDate(value: string): number {
    return parse(value, "yyyy-MM-dd", new Date()).getTime();
}

export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
}

export function formatPeriod(dateString: number): string {
    return format(new Date(dateString), "LLLL yyyy", { locale: es });
}

export function formatDateOnly(timestamp: number): string {
    return format(new Date(timestamp), "dd/MM/yyyy", { locale: es });
}
