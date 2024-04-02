import { Searchbar, WeatherInfo, CityInfo } from "../../components/Sidebar";

export function Sidebar() {
    return (
        <div className="flex flex-col p-10">
            <Searchbar />
            <WeatherInfo />
            <hr className="my-10" />
            <CityInfo />
        </div>
    );
}
