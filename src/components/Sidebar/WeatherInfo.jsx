import weatherIconData from "../../data/weathericon.json";

export function WeatherInfo({ currentWeatherData }) {
    if (!currentWeatherData) {
        return <div>Loading...</div>;
    }

    const { weather, main, dt } = currentWeatherData;
    const { description, icon } = weather[0];
    const { temp } = main;

    const weatherIcon = weatherIconData.find((item) => item.name === icon);
    const iconUrl = weatherIcon ? weatherIcon.url : "";

    const dateTime = new Date(dt * 1000); // Convert seconds to milliseconds
    const formattedDateTime = dateTime.toLocaleString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div>
            <div className="flex justify-center">
                <img
                    src={iconUrl}
                    alt="weather-icon"
                    id="weather__icon"
                    className="size-56"
                />
            </div>
            <div className="flex flex-row mb-8">
                <p id="weather__temp" className="xl:text-8xl lg:text-6xl text-8xl">
                    {temp}
                </p>
                <span className="text-3xl">°C</span>
            </div>
            <div className="mb-2 text-xl text-gray-500">
                <p id="weather__today-datetime">{formattedDateTime}</p>
            </div>
            <div>
                <p id="weather__desc">{description}</p>
            </div>
        </div>
    );
}
