import weatherIconData from "../../data/weathericon.json";

export function TodayWeather({ forecastWeatherData }) {
    if (!forecastWeatherData) {
        return <div>Loading...</div>;
    }

    // Get today's date in the format "YYYY-MM-DD" in local time zone
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;

    // Filter the forecastWeatherData.list array to get elements only for today
    const todayWeatherList = forecastWeatherData.list.filter((item) =>
        item.dt_txt.includes(todayDate)
    );

    return (
        <div>
            <div className="mb-5 font-bold">
                <p>Today's Full Day Weather</p>
            </div>
            <div className="flex flex-row gap-5 mb-10 overflow-x-scroll overflow-hidden scrollbar-hidden">
                {todayWeatherList.map((weatherItem, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-md text-center w-52 flex-shrink-0"
                    >
                        <div className="mb-3">
                            <p>{formatDateTime(weatherItem.dt_txt)}</p>
                        </div>
                        <div className="flex justify-center mb-3">
                            {/* Render weather icon using the imported JSON data */}
                            {weatherIconData.map((iconItem, index) => {
                                if (
                                    iconItem.name ===
                                    weatherItem.weather[0].icon
                                ) {
                                    return (
                                        <img
                                            key={index}
                                            src={iconItem.url}
                                            alt={iconItem.name}
                                            className="size-10"
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="flex flex-row gap-3 justify-center">
                            <div>
                                <p>{weatherItem.main.temp_max} °C</p>
                            </div>
                            <div className="text-gray-500">
                                <p>{weatherItem.main.temp_min} °C</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatDateTime(dt_txt) {
    const timePart = dt_txt.split(" ")[1];

    const formattedTime = new Date(`2000-01-01T${timePart}`).toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }
    );

    return `${formattedTime}`;
}
