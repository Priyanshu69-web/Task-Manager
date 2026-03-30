
import React, { useState } from "react";
import { getAvatarUrl, getInitials } from "../../utils/avatarHelper";

const FALLBACK_COLORS = [
    "bg-blue-500", "bg-emerald-500", "bg-violet-500",
    "bg-amber-500", "bg-rose-500", "bg-cyan-500",
    "bg-indigo-500", "bg-teal-500",
];

const AvatarItem = ({ src, name, index }) => {
    const [imgError, setImgError] = useState(false);
    const resolvedUrl = getAvatarUrl(src);
    const color = FALLBACK_COLORS[index % FALLBACK_COLORS.length];

    if (!resolvedUrl || imgError) {
        return (
            <div
                className={`w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 flex items-center justify-center ${color} text-white text-xs font-semibold`}
                title={name || "User"}
            >
                {getInitials(name)}
            </div>
        );
    }

    return (
        <img
            src={resolvedUrl}
            alt={name || `Avatar ${index}`}
            className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
            onError={() => setImgError(true)}
        />
    );
};

const AvatarGroup = ({ avatars, names = [], maxVisible = 3 }) => {
    return (
        <div className="flex items-center">
            {avatars.slice(0, maxVisible).map((avatar, index) => (
                <AvatarItem
                    key={index}
                    src={avatar}
                    name={names[index]}
                    index={index}
                />
            ))}
            {avatars.length > maxVisible && (
                <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
                    +{avatars.length - maxVisible}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
