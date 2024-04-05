import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function CityInfo({ currentWeatherData }) {
    if (!currentWeatherData) {
        return <div>Loading...</div>;
    }

    const {
        name,
        sys: { country },
    } = currentWeatherData;

    return (
        <div className="shadow-xl shadow-gray-300 p-7 text-center text-xl rounded-md font-bold">
            <p id="weather__city-name">
                <FontAwesomeIcon icon={faLocationDot} /> {`${name}, ${country}`}
            </p>
        </div>
    );
}
