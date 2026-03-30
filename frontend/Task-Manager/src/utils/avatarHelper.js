/**
 * Rewrites avatar/image URLs that point to the old production server
 * to use the current local backend URL instead.
 * Also handles null/undefined/empty URLs.
 */
import { BASE_URL } from "./apiPath";

const OLD_PRODUCTION_URL = "https://task-manager-9ehi.onrender.com";

export const getAvatarUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return null;
    
    const trimmedUrl = url.trim();

    // If it's already using the correct BASE_URL, return as is
    if (trimmedUrl.startsWith(BASE_URL)) {
        return trimmedUrl;
    }

    // Rewrite old production URLs to current environment's BASE_URL
    if (trimmedUrl.startsWith(OLD_PRODUCTION_URL)) {
        return trimmedUrl.replace(OLD_PRODUCTION_URL, BASE_URL);
    }

    // If it's a relative path like /uploads/..., prepend BASE_URL
    if (trimmedUrl.startsWith("/uploads")) {
        return `${BASE_URL}${trimmedUrl}`;
    }

    // For other cases (e.g. localhost URL in DB but we are in production)
    if (trimmedUrl.startsWith("http://localhost:8000")) {
        return trimmedUrl.replace("http://localhost:8000", BASE_URL);
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
