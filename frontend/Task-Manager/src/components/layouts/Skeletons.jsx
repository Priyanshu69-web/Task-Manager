import React from "react";

/**
 * Skeleton loader components for loading states
 */

// Generic pulsing skeleton block
export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Skeleton for dashboard stats cards
export const DashboardSkeleton = () => (
    <div className="animate-pulse">
        <div className="card my-5">
            <div className="flex items-center gap-3">
                <Skeleton className="w-48 h-8 rounded-lg" />
            </div>
            <Skeleton className="w-32 h-4 mt-2 rounded" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="card">
                <Skeleton className="w-40 h-5 mb-4 rounded" />
                <Skeleton className="w-full h-[300px] rounded-xl" />
            </div>
            <div className="card">
                <Skeleton className="w-40 h-5 mb-4 rounded" />
                <Skeleton className="w-full h-[300px] rounded-xl" />
            </div>
        </div>
        <div className="card">
            <Skeleton className="w-32 h-5 mb-4 rounded" />
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 py-3 border-t border-gray-100">
                    <Skeleton className="flex-1 h-4 rounded" />
                    <Skeleton className="w-20 h-4 rounded" />
                    <Skeleton className="w-16 h-4 rounded" />
                    <Skeleton className="w-24 h-4 rounded hidden md:block" />
                </div>
            ))}
        </div>
    </div>
);

// Skeleton for task cards grid
export const TaskCardsSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 animate-pulse">
                <div className="flex gap-2 px-4 mb-3">
                    <Skeleton className="w-20 h-5 rounded" />
                    <Skeleton className="w-24 h-5 rounded" />
                </div>
                <div className="px-4 border-l-[13px] border-gray-200">
                    <Skeleton className="w-3/4 h-4 mt-2 rounded" />
                    <Skeleton className="w-full h-3 mt-2 rounded" />
                    <Skeleton className="w-1/2 h-3 mt-2 rounded" />
                    <Skeleton className="w-full h-1.5 mt-3 rounded-full" />
                </div>
                <div className="px-4 mt-3 flex justify-between">
                    <Skeleton className="w-24 h-8 rounded" />
                    <Skeleton className="w-24 h-8 rounded" />
                </div>
                <div className="px-4 mt-3 flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[...Array(3)].map((_, j) => (
                            <Skeleton key={j} className="w-9 h-9 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Skeleton for user cards grid
export const UserCardsSkeleton = ({ count = 3 }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="user-card p-2 animate-pulse">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                        <Skeleton className="w-28 h-4 rounded" />
                        <Skeleton className="w-36 h-3 mt-1.5 rounded" />
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Skeleton className="flex-1 h-12 rounded" />
                    <Skeleton className="flex-1 h-12 rounded" />
                    <Skeleton className="flex-1 h-12 rounded" />
                </div>
            </div>
        ))}
    </div>
);

// Skeleton for task detail view
export const TaskDetailSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-4 animate-pulse">
        <div className="form-card col-span-3">
            <div className="flex justify-between items-center">
                <Skeleton className="w-48 h-6 rounded" />
                <Skeleton className="w-24 h-6 rounded" />
            </div>
            <Skeleton className="w-full h-4 mt-4 rounded" />
            <Skeleton className="w-3/4 h-4 mt-2 rounded" />
            <div className="grid grid-cols-3 gap-4 mt-4">
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
            </div>
            <div className="mt-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="flex-1 h-4 rounded" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);
