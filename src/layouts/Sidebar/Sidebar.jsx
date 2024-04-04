import { Searchbar, WeatherInfo, CityInfo } from "../../components/Sidebar";

export function Sidebar({ setInputCity, weatherData }) {
    return (
        <section className="flex flex-col p-10">
            <Searchbar setInputCity={setInputCity} />
            <WeatherInfo weatherData={weatherData} />
            <hr className="my-10" />
            <CityInfo weatherData={weatherData} />
        </section>
    );
}
