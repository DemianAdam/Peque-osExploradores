import { format, parse } from "date-fns";

export function formatDateForInput(timestamp: number): string {
    return format(new Date(timestamp), "yyyy-MM-dd");
}

export function parseInputDate(value: string): number {
    return parse(value, "yyyy-MM-dd", new Date()).getTime();
}

export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
}
