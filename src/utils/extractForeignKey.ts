export function extractForeignKey(meta: any): string {
    if (meta && meta.constraint) {
        const match = meta.constraint.match(/_(.+?)_fkey/);
        if (match && match[1]) {
            return match[1];
        }
    }

    return 'Unknown field';
}