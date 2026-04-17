import weatherIconData from "../../data/weathericon.json";
import { SkeletonWeatherInfo } from "./SkeletonWeatherInfo";

export function WeatherInfo({ currentWeatherData, loading }) {
    if (loading || !currentWeatherData) return <SkeletonWeatherInfo />;

    const { weather, main, dt } = currentWeatherData;
    const { description, icon } = weather[0];
    const { temp } = main;

    const iconUrl = weatherIconData.find((i) => i.name === icon)?.url ?? "";

    const formattedDateTime = new Date(dt * 1000).toLocaleString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div className="flex flex-col items-center text-center flex-1 justify-center py-4">
            <div className="relative mb-2">
                {/* Weather icon */}
                <img
                    src={iconUrl}
                    alt={description}
                    draggable={false}
                    className="w-32 h-32 object-contain drop-shadow-[0_0_24px_rgba(99,179,237,0.35)] animate-float"
                />
                {/* Ecllipse decoration below the icon */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-[radial-gradient(ellipse,rgba(99,179,237,0.2)_0%,transparent_75%)]" />
            </div>
            <div className="flex items-start gap-1 mb-2">
                <span className="text-9xl font-light text-slate-100">
                    {Math.round(temp)}
                </span>
                <span className="text-2xl text-slate-400 mt-3">°C</span>
            </div>
            <p className="text-xl text-slate-400 mb-1">{formattedDateTime}</p>
            <p className="text-sm text-slate-300 capitalize">{description}</p>
        </div>
    );
}