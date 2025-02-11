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

export function data_get(object: object, key: string): any {
    // Handle null/undefined object
    if (object == null) {
        return null;
    }

    // Convert the path to an array if it's not already
    const segments = key.split('.');

    // Handle empty path
    if (segments.length === 0) {
        return object;
    }

    let result = object;

    for (const segment of segments) {
        // Handle array indices and object properties
        if (result == null) {
            return null;
        }

        // Check if the segment is a valid array index
        const isArrayIndex = /^\d+$/.test(segment);

        if (Array.isArray(result) && isArrayIndex) {
            result = result[parseInt(segment, 10)];
        } else {
            //@ts-ignore
            result = result[segment];
        }
    }

    return result === undefined ? null : result;
}

export function data_set(object: object, key: string, value: any): any {
    if (key.includes('.')) {
        const parts = key.split('.');
        const rootKey = parts[0];
        const existingValue = (object as any)[rootKey] || {};

        let current = existingValue;
        for (let i = 1; i < parts.length - 1; i++) {
            current[parts[i]] = current[parts[i]] || {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        (object as any)[rootKey] = existingValue;
    } else {
        (object as any)[key] = value;
    }
}