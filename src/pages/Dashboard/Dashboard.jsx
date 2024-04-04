import {
    TodayWeather,
    TodayHighlight,
    ForecastWeather,
} from "../../components/Dashboard";

export function Dashboard({
    currentWeatherData,
    forecastWeatherData,
    airQualityData,
}) {
    return (
        <section className="w-full p-10 bg-gray-100">
            <TodayWeather forecastWeatherData={forecastWeatherData} />
            <TodayHighlight
                currentWeatherData={currentWeatherData}
                airQualityData={airQualityData}
            />
            <ForecastWeather forecastWeatherData={forecastWeatherData} />
        </section>
    );
}
