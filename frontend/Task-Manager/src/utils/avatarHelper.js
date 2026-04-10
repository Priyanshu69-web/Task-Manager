/**
 * Rewrites avatar/image URLs that point to the old production server
 * to use the current local backend URL instead.
 * Also handles null/undefined/empty URLs.
 */
import { BASE_URL } from "./apiPath";

const LEGACY_BASE_URLS = [
    "https://task-manager-1-709e.onrender.com",
    "http://localhost:8000",
];

export const getAvatarUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return null;
    
    const trimmedUrl = url.trim();

    // If it's already using the correct BASE_URL, return as is
    if (trimmedUrl.startsWith(BASE_URL)) {
        return trimmedUrl;
    }

    // If it's a relative path like /uploads/..., prepend BASE_URL
    if (trimmedUrl.startsWith("/uploads")) {
        return `${BASE_URL}${trimmedUrl}`;
    }

    // Rewrite stale backend hosts to the active API base URL.
    const legacyBaseUrl = LEGACY_BASE_URLS.find((url) => trimmedUrl.startsWith(url));
    if (legacyBaseUrl) {
        return trimmedUrl.replace(legacyBaseUrl, BASE_URL);
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
