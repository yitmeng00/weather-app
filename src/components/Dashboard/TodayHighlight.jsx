export function TodayHighlight({ currentWeatherData, airQualityData }) {
    if (!currentWeatherData || !airQualityData) {
        return <div>Loading...</div>;
    }

    const { main, wind, sys } = currentWeatherData;
    const { speed } = wind;
    const { feels_like, pressure, humidity } = main;
    const { sunrise, sunset } = sys;

    const { aqi } = airQualityData.list[0].main;

    const sunriseDT = new Date(sunrise * 1000); // Convert seconds to milliseconds
    const formattedSunriseDT = sunriseDT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const sunsetDT = new Date(sunset * 1000); // Convert seconds to milliseconds
    const formattedSunsetDT = sunsetDT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <div>
            <div className="mb-5">
                <p>Today's Highlights</p>
            </div>
            <div className="grid grid-cols-6 gap-5 mb-10 overflow-x-scroll">
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Feels Like</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>{feels_like}</p>
                        </div>
                        <div>
                            <p>°C</p>
                        </div>
                    </div>
                    <div>
                        <p>Humidity is making it feel hotter.</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Humidity</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>{humidity}</p>
                        </div>
                        <div>
                            <p>%</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Pressure</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>{pressure}</p>
                        </div>
                        <div>
                            <p>hPa</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Wind</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>{speed}</p>
                        </div>
                        <div>
                            <p>KM/H</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Sunrise & Sunset</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>icon</p>
                        </div>
                        <div>
                            <p>{formattedSunriseDT}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>icon</p>
                        </div>
                        <div>
                            <p>{formattedSunsetDT}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Air Quality</p>
                    </div>
                    <div className="flex flex-row">
                        <div>
                            <p>Air Quality Index</p>
                        </div>
                        <div>
                            <p>{aqi}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
