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
            <div className="mb-5">
                <p>Today's Full Day Weather</p>
            </div>
            <div className="flex flex-row gap-5 mb-10 overflow-x-scroll">
                {todayWeatherList.map((weatherItem, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-md text-center"
                    >
                        <div>
                            <p>{weatherItem.dt_txt}</p>
                        </div>
                        <div>
                            <p>{weatherItem.weather[0].icon}</p>
                        </div>
                        <div className="flex flex-row gap-3 justify-center">
                            <div>
                                <p>{weatherItem.main.temp_min}°C</p>
                            </div>
                            <div>
                                <p>{weatherItem.main.temp_max}°C</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
