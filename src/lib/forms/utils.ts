export async function readFileUpload(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        let content = '';
        const reader = new FileReader();
        reader.onloadend = function (e: any) {
            content = e.target.result;
            resolve(content);
        };
        reader.onerror = function (e: any) {
            reject(e);
        };
        reader.readAsText(file);
    })
}