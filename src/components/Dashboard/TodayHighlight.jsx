import aqiData from "../../data/aqi.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SkeletonCard } from "./SkeletonCards";
import { HighlightCard } from "./HighlightCard";
import {
    faCircleArrowUp,
    faCircleArrowDown,
    faTemperature0,
    faDroplet,
    faGauge,
    faWind,
    faSun,
    faSmog,
    faFaceLaugh,
    faFaceSmile,
    faFaceMeh,
    faFaceFrownOpen,
    faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

const getFAIcon = (name) =>
    ({ faFaceLaugh, faFaceSmile, faFaceMeh, faFaceFrownOpen, faFaceFrown })[
        name
    ] ?? null;

const getAqiStyle = (index) => {
    if (index <= 2)
        return {
            text: "text-emerald-400",
            bg: "bg-emerald-400/10 border-emerald-400/30",
        };
    if (index === 3)
        return {
            text: "text-amber-400",
            bg: "bg-amber-400/10 border-amber-400/30",
        };
    return { text: "text-red-400", bg: "bg-red-400/10 border-red-400/30" };
};

export function TodayHighlight({
    currentWeatherData,
    airQualityData,
    loading,
}) {
    if (loading || !currentWeatherData || !airQualityData) {
        return (
            <div className="mb-8">
                <p className="md:text-[16px] text-sm font-medium uppercase tracking-widest text-slate-500 mb-4">
                    Today's Highlights
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const { main, wind, sys } = currentWeatherData;
    const { feels_like, pressure, humidity } = main;
    const { speed } = wind;
    const { sunrise, sunset } = sys;
    const { aqi } = airQualityData.list[0].main;
    const aqiStyle = getAqiStyle(aqi);
    const currentAqi = aqiData.find((d) => d.index === aqi);

    const fmt = (ts) =>
        new Date(ts * 1000).toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return (
        <div className="mb-8">
            <p className="md:text-[16px] text-sm font-medium uppercase tracking-widest text-slate-500 mb-4">
                Today's Highlights
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                {/* Feels Like */}
                <HighlightCard icon={faTemperature0} label="Feels Like">
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-light text-slate-100 tracking-tight">
                            {Math.round(feels_like)}
                        </span>
                        <span className="text-sm text-slate-400">°C</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                        Humidity makes it feel hotter.
                    </p>
                </HighlightCard>
                {/* Humidity */}
                <HighlightCard icon={faDroplet} label="Humidity">
                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-4xl font-light text-slate-100 tracking-tight">
                            {humidity}
                        </span>
                        <span className="text-sm text-slate-400">%</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-sky-400 to-cyan-300 transition-all duration-700"
                            style={{ width: `${humidity}%` }}
                        />
                    </div>
                </HighlightCard>
                {/* Pressure */}
                <HighlightCard icon={faGauge} label="Pressure">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-light text-slate-100 tracking-tight">
                            {pressure}
                        </span>
                        <span className="text-sm text-slate-400">hPa</span>
                    </div>
                </HighlightCard>
                {/* Wind */}
                <HighlightCard icon={faWind} label="Wind Speed">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-light text-slate-100 tracking-tight">
                            {Math.round(speed * 3.6)}
                        </span>
                        <span className="text-sm text-slate-400">km/h</span>
                    </div>
                </HighlightCard>
                {/* Sunrise & Sunset */}
                <HighlightCard icon={faSun} label="Sunrise & Sunset">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0">
                                <FontAwesomeIcon
                                    icon={faCircleArrowUp}
                                    className="text-amber-400 text-xs"
                                />
                            </div>
                            <span className="text-sm font-medium text-slate-200">
                                {fmt(sunrise)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-sky-400/15 flex items-center justify-center shrink-0">
                                <FontAwesomeIcon
                                    icon={faCircleArrowDown}
                                    className="text-sky-400 text-xs"
                                />
                            </div>
                            <span className="text-sm font-medium text-slate-200">
                                {fmt(sunset)}
                            </span>
                        </div>
                    </div>
                </HighlightCard>
                {/* Air Quality */}
                <HighlightCard icon={faSmog} label="Air Quality">
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-light text-slate-100 tracking-tight">
                            {aqi}
                        </span>
                        <span className="text-sm text-slate-400">AQI</span>
                    </div>
                    {currentAqi && (
                        <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${aqiStyle.text} ${aqiStyle.bg}`}
                        >
                            {currentAqi.qualitative_name}
                            {getFAIcon(currentAqi.icon) && (
                                <FontAwesomeIcon
                                    icon={getFAIcon(currentAqi.icon)}
                                    className="text-xs"
                                />
                            )}
                        </div>
                    )}
                </HighlightCard>
            </div>
        </div>
    );
}
