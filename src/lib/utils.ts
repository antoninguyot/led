export async function evaluate<T>(expr: any): Promise<T> {
    if (expr instanceof Function) {
        let result = expr();
        return await Promise.resolve(result)
    }
    return expr
}

export function titleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
