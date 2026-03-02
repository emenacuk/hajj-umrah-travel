/**
 * Checks if a string containing HTML is effectively empty.
 * Returns true if the string is null, undefined, or contains only HTML tags, whitespace, and non-breaking spaces.
 */
export const isEmptyHtml = (html: string | undefined | null): boolean => {
    if (!html) return true;
    // Remove all HTML tags and replace &nbsp; with space, then trim
    const cleanContent = html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
    return cleanContent === '';
};
