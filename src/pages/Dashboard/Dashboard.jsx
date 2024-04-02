import {
    TodayWeather,
    TodayHighlight,
    ForecastWeather,
} from "../../components/Dashboard";

export function Dashboard() {
    return (
        <section className="w-full p-10 bg-gray-100">
            <TodayWeather />
            <TodayHighlight />
            <ForecastWeather />
        </section>
    );
}
