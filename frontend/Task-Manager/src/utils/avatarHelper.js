/**
 * Rewrites avatar/image URLs that point to the old production server
 * to use the current local backend URL instead.
 * Also handles null/undefined/empty URLs.
 */
const PRODUCTION_URL = "https://task-manager-9ehi.onrender.com";
const LOCAL_URL = "http://localhost:8000";

export const getAvatarUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return null;
    
    const trimmedUrl = url.trim();

    // Rewrite production URLs to local
    if (trimmedUrl.startsWith(PRODUCTION_URL)) {
        return trimmedUrl.replace(PRODUCTION_URL, LOCAL_URL);
    }

    // If it's a relative path like /uploads/..., prepend local URL
    if (trimmedUrl.startsWith("/uploads")) {
        return `${LOCAL_URL}${trimmedUrl}`;
    }

    return trimmedUrl;
};

/**
 * Get initials from a name for fallback avatar display
 * e.g. "John Doe" → "JD", "Alice" → "A"
 */
export const getInitials = (name) => {
    if (!name) return "?";
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
};
