export function SkeletonHourly() {
    return (
        <div className="shrink-0 md:w-25 w-24 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col items-center gap-2 animate-pulse">
            <div className="w-10 h-2.5 rounded bg-white/8" />
            <div className="w-10 h-10 rounded-full bg-white/8" />
            <div className="w-8 h-3 rounded bg-white/8" />
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse">
            <div className="w-24 h-3 rounded bg-white/8 mb-4" />
            <div className="w-20 h-9 rounded bg-white/8 mb-3" />
            <div className="w-28 h-3 rounded bg-white/8" />
        </div>
    );
}

export function SkeletonForecast() {
    return (
        <div className="shrink-0 w-28 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center gap-2 animate-pulse">
            <div className="w-14 h-2.5 rounded bg-white/8" />
            <div className="w-10 h-2 rounded bg-white/8" />
            <div className="w-11 h-11 rounded-full bg-white/8" />
            <div className="w-10 h-3.5 rounded bg-white/8" />
            <div className="w-8 h-3 rounded bg-white/8" />
        </div>
    );
}
