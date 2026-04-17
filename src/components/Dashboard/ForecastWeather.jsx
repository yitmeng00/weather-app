import { useRef } from "react";
import weatherIconData from "../../data/weathericon.json";
import { SkeletonForecast } from "./SkeletonCards";

const formatDateTime = (dt_txt) => {
    const [datePart, timePart] = dt_txt.split(" ");
    const [y, m, d] = datePart.split("-");
    const date = new Date(y, m - 1, d);
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        weekday: "short",
    });
    const formattedTime = new Date(`2000-01-01T${timePart}`).toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        },
    );
    return { date: formattedDate, time: formattedTime };
}

const getIconUrl = (iconName) => {
    return weatherIconData.find((i) => i.name === iconName)?.url ?? "";
}

export function ForecastWeather({ forecastWeatherData, loading }) {
    const scrollRef = useRef(null);
    const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

    const onMouseDown = (e) => {
        drag.current = {
            active: true,
            startX: e.pageX - scrollRef.current.offsetLeft,
            scrollLeft: scrollRef.current.scrollLeft,
        };
        scrollRef.current.style.cursor = "grabbing";
    }
    
    const onMouseLeaveOrUp = () => {
        drag.current.active = false;
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    }

    const onMouseMove = (e) => {
        if (!drag.current.active) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        scrollRef.current.scrollLeft =
            drag.current.scrollLeft - (x - drag.current.startX);
    }

    if (loading || !forecastWeatherData) {
        return (
            <div className="mb-8">
                <p className="md:text-[16px] text-sm font-medium uppercase tracking-widest text-slate-500 mb-4">
                    5-Day Forecast
                </p>
                <div className="flex gap-3 overflow-hidden">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonForecast key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const list = forecastWeatherData.list.filter(
        (item) => item.dt_txt.slice(0, 10) > todayString,
    );

    return (
        <div className="mb-8">
            <p className="md:text-[16px] text-sm font-medium uppercase tracking-widest text-slate-500 mb-2">
                5-Day Forecast
            </p>
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeaveOrUp}
                onMouseUp={onMouseLeaveOrUp}
                onMouseMove={onMouseMove}
            >
                {list.map((item, i) => {
                    const { date, time } = formatDateTime(item.dt_txt);
                    return (
                        <div
                            key={i}
                            className="shrink-0 w-28 rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:bg-white/8 hover:border-sky-400/20 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <p className="text-[13px] font-medium text-slate-300 mb-0.5">
                                {date}
                            </p>
                            <p className="text-[12px] text-slate-400 mb-3">
                                {time}
                            </p>
                            <img
                                src={getIconUrl(item.weather[0].icon)}
                                alt={item.weather[0].description}
                                draggable={false}
                                className="md:size-12 size-10 object-contain mx-auto mb-3"
                            />
                            <div className="flex justify-center gap-1.5">
                                <p className="text-[13px] font-medium text-slate-200">
                                    {Math.round(item.main.temp_max)}°C
                                </p>
                                <p className="text-[13px] text-slate-400">
                                    {Math.round(item.main.temp_min)}°C
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
