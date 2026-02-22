/**
 * Centralized security utilities for input sanitization and output encoding.
 */

/**
 * Escapes HTML special characters to prevent XSS.
 * Use this when injecting user-provided strings into HTML contexts.
 */
export function escapeHtml(str: string): string {
    if (!str) return '';
    const htmlEscapes: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

/**
 * Prepares a JSON object for safe injection into a <script> tag.
 * Specifically prevents tag breakout by escaping the sequence </script>.
 */
export function safeJsonLd(data: object): string {
    return JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');
}
