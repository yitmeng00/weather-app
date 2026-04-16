import weatherIconData from "../../data/weathericon.json";
import { SkeletonHourly } from "./SkeletonCards";

function formatTime(dt_txt) {
    const timePart = dt_txt.split(" ")[1];
    return new Date(`2000-01-01T${timePart}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function getIconUrl(iconName) {
    return weatherIconData.find((i) => i.name === iconName)?.url ?? "";
}

export function TodayWeather({ forecastWeatherData, loading }) {
    if (loading || !forecastWeatherData) {
        return (
            <div className="mb-8">
                <p className="md:text-[16px] text-md font-medium uppercase tracking-widest text-slate-500 mb-4">
                    Today's Weather
                </p>
                <div className="flex gap-3 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonHourly key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const list = forecastWeatherData.list.filter((item) =>
        item.dt_txt.startsWith(todayStr),
    );
    const nowHour = today.getHours();

    return (
        <div className="mb-8">
            <p className="md:text-[16px] text-sm font-medium uppercase tracking-widest text-slate-500 mb-2">
                Today's Weather
            </p>
            <div className="flex gap-3 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {list.map((item, i) => {
                    const hour = new Date(item.dt_txt).getHours();
                    const isNow = Math.abs(hour - nowHour) < 3;
                    return (
                        <div
                            key={i}
                            className={`shrink-0 md:w-25 w-24 rounded-xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5 ${
                                isNow
                                    ? "bg-sky-400/8 border-sky-400/40"
                                    : "bg-white/5 border-white/10 hover:bg-white/8"
                            }`}
                        >
                            <p
                                className={`md:text-[15px] text-sm font-medium uppercase tracking-wide mb-2 ${isNow ? "text-sky-400" : "text-slate-500"}`}
                            >
                                {formatTime(item.dt_txt)}
                            </p>
                            <img
                                src={getIconUrl(item.weather[0].icon)}
                                alt={item.weather[0].description}
                                draggable={false}
                                className="md:size-12 size-10 object-contain mx-auto mb-2"
                            />
                            <div className="flex justify-center gap-1.5">
                                <span className="md:text-[15px] text-sm font-medium text-slate-200">
                                    {Math.round(item.main.temp_max)}°
                                </span>
                                <span className="md:text-[15px] text-sm text-slate-500">
                                    {Math.round(item.main.temp_min)}°
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
