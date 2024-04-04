import { Searchbar, WeatherInfo, CityInfo } from "../../components/Sidebar";

export function Sidebar({ setInputCity, currentWeatherData }) {
    return (
        <section className="flex flex-col p-10">
            <Searchbar setInputCity={setInputCity} />
            <WeatherInfo currentWeatherData={currentWeatherData} />
            <hr className="my-10" />
            <CityInfo currentWeatherData={currentWeatherData} />
        </section>
    );
}
