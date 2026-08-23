export function formatDateForInput(timestamp: number): string {
    return new Date(timestamp).toISOString().split("T")[0];
}

export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
}
