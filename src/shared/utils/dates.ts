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

export function formatPeriod(dateString: string): string {
    if (!dateString) return "";

    // Parseamos la fecha "YYYY-MM-DD" evitando problemas de zona horaria
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day || 1);

    // Formateamos para obtener mes y año (ej: "agosto de 2026")
    const formatted = date.toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
    });

    // Capitalizamos la primera letra ("Agosto de 2026")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}