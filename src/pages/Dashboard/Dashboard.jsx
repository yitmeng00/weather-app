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
        <section className="lg:w-3/4 w-full p-10 bg-gradient-to-r from-gray-200 from-10% via-gray-300 via-30% to-gray-400 to-90% lg:overflow-y-scroll lg:overflow-hidden">
            <TodayWeather forecastWeatherData={forecastWeatherData} />
            <TodayHighlight
                currentWeatherData={currentWeatherData}
                airQualityData={airQualityData}
            />
            <ForecastWeather forecastWeatherData={forecastWeatherData} />
        </section>
    );
}
