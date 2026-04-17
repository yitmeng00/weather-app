export function SkeletonWeatherInfo() {
    return (
        <div className="flex flex-col items-center text-center flex-1 justify-center py-4 gap-3 animate-pulse">
            <div className="w-32 h-32 rounded-full bg-white/8" />
            <div className="w-32 h-16 rounded-lg bg-white/8" />
            <div className="w-40 h-3 rounded bg-white/8" />
            <div className="w-28 h-3 rounded bg-white/8" />
        </div>
    );
}