"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractForeignKey = extractForeignKey;
function extractForeignKey(meta) {
    if (meta && meta.constraint) {
        const match = meta.constraint.match(/_(.+?)_fkey/);
        if (match && match[1]) {
            return match[1];
        }
    }
    return 'Unknown field';
}
