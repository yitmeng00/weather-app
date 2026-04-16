import { Searchbar, WeatherInfo, CityInfo } from "../../components/Sidebar";

export function Sidebar({ setInputCity, currentWeatherData, loading }) {
    return (
        <section className="relative flex flex-col lg:w-75 lg:min-h-screen w-full p-7 overflow-hidden lg:bg-linear-to-tr bg-linear-to-bl from-sky-900 to-[#0F1F32] border-[0.5px] border-b-white/20 lg:border-r-white/20">
            {/* Circle gradient decoration */}
            <div className="pointer-events-none absolute -top-10 right-0 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.12)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(30,63,110,0.4)_0%,transparent_70%)]" />
            <div className="flex flex-col h-full">
                <Searchbar setInputCity={setInputCity} loading={loading} />
                <WeatherInfo currentWeatherData={currentWeatherData} loading={loading} />
                <div className="my-6 h-px bg-white/10" />
                <CityInfo currentWeatherData={currentWeatherData} loading={loading} />
            </div>
        </section>
    );
}