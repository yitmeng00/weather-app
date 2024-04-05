import aqiData from "../../data/aqi.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowUp,
    faCircleArrowDown,
    faTemperature0,
    faDroplet,
    faGauge,
    faWind,
    faSun,
    faSmog,
    faFaceLaugh,
    faFaceSmile,
    faFaceMeh,
    faFaceFrownOpen,
    faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

export function TodayHighlight({ currentWeatherData, airQualityData }) {
    if (!currentWeatherData || !airQualityData) {
        return <div>Loading...</div>;
    }

    // Mapping function to convert icon string to FontAwesome icon object
    const getFontAwesomeIcon = (iconName) => {
        switch (iconName) {
            case "faFaceLaugh":
                return faFaceLaugh;
            case "faFaceSmile":
                return faFaceSmile;
            case "faFaceMeh":
                return faFaceMeh;
            case "faFaceFrownOpen":
                return faFaceFrownOpen;
            case "faFaceFrown":
                return faFaceFrown;
            default:
                return null; // Handle default case or error
        }
    };

    // Function to get color based on AQI index
    const getColor = (index) => {
        if (index === 1 || index === 2) {
            return "green"; // Good and Fair
        } else if (index === 3) {
            return "orange"; // Moderate
        } else if (index === 4 || index === 5) {
            return "red"; // Poor and Very Poor
        } else {
            return "black"; // Default color
        }
    };

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
            <div className="mb-5 font-bold">
                <p>Today's Highlights</p>
            </div>
            <div className="grid grid-cols-6 gap-5 mb-10">
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faTemperature0} /> Feels Like
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 mb-10">
                        <div className="text-5xl">
                            <p>{feels_like}</p>
                        </div>
                        <div>
                            <p>°C</p>
                        </div>
                    </div>
                    <div className="text-gray-500">
                        <p>Humidity is making it feel hotter.</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faDroplet} /> Humidity
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="text-5xl">
                            <p>{humidity}</p>
                        </div>
                        <div>
                            <p>%</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faGauge} /> Pressure
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="text-5xl">
                            <p>{pressure}</p>
                        </div>
                        <div>
                            <p>hPa</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faWind} /> Wind
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="text-5xl">
                            <p>{speed}</p>
                        </div>
                        <div>
                            <p>KM/H</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faSun} /> Sunrise & Sunset
                        </p>
                    </div>
                    <div className="flex flex-row gap-3 text-3xl mb-3">
                        <div>
                            <FontAwesomeIcon icon={faCircleArrowUp} />
                        </div>
                        <div>
                            <p>{formattedSunriseDT}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 text-3xl">
                        <div>
                            <FontAwesomeIcon icon={faCircleArrowDown} />
                        </div>
                        <div>
                            <p>{formattedSunsetDT}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div className="font-bold text-gray-500 mb-4">
                        <p>
                            <FontAwesomeIcon icon={faSmog} /> Air Quality
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 mb-10">
                        <div className="text-5xl">
                            <p>{aqi}</p>
                        </div>
                        <div>
                            <p>AQI</p>
                        </div>
                    </div>
                    <div className="text-gray-500">
                        {aqiData.map((aqidata, key) => {
                            const icon = getFontAwesomeIcon(aqidata.icon);
                            if (aqidata.index === aqi) {
                                return (
                                    <div className="flex flex-row gap-1 items-center">
                                        <p>
                                            {aqidata.qualitative_name}
                                        </p>
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
