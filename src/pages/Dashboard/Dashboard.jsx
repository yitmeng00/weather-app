import {
    TodayWeather,
    TodayHighlight,
    ForecastWeather,
} from "../../components/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export function Dashboard({
    currentWeatherData,
    forecastWeatherData,
    airQualityData,
    loading,
    error,
}) {
    return (
        <section className="flex-1 p-7 bg-linear-to-tl from-sky-900 to-[#0F1F32] overflow-x-hidden">
            {/* Error Toast */}
            {error && (
                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    <span>
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            className="text-base"
                        />
                    </span>
                    <span>{error}</span>
                </div>
            )}
            <TodayWeather
                forecastWeatherData={forecastWeatherData}
                loading={loading}
            />
            <TodayHighlight
                currentWeatherData={currentWeatherData}
                airQualityData={airQualityData}
                loading={loading}
            />
            <ForecastWeather
                forecastWeatherData={forecastWeatherData}
                loading={loading}
            />
        </section>
    );
}
