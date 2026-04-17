import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function CityInfo({ currentWeatherData, loading }) {
    if (loading || !currentWeatherData) {
        return (
            <div className="flex justify-center animate-pulse">
                <div className="w-40 h-5 rounded-full bg-white/8" />
            </div>
        );
    }

    const { name, sys: { country } } = currentWeatherData;

    return (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <FontAwesomeIcon icon={faLocationDot} className="text-sky-400 text-sm" />
            <span className="text-sm font-medium text-slate-200">{name}, {country}</span>
        </div>
    );
}