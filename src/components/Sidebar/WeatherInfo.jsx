export function WeatherInfo({ weatherData }) {
    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const { weather, main, dt } = weatherData;
    const { description, icon } = weather[0];
    const { temp } = main;

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

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
                    className="size-40"
                />
            </div>
            <div className="flex flex-row mb-8">
                <p id="weather__temp" className="text-7xl">
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
