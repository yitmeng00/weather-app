import { useState, useEffect } from "react";
import Sidebar from "./layouts/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_APPID;
const API_VERSION = 2.5;
const API_BASE_ENDPOINT = "https://api.openweathermap.org/data/";
const UNITS = "metric";

function App() {
    const [inputCity, setInputCity] = useState("");
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastWeatherData, setForecastWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);

            const [current, forecast, air] = await Promise.all([
                axios.get(`${API_BASE_ENDPOINT}${API_VERSION}/weather`, {
                    params: { lat, lon, appid: API_KEY, units: UNITS },
                }),
                axios.get(`${API_BASE_ENDPOINT}${API_VERSION}/forecast`, {
                    params: { lat, lon, appid: API_KEY, units: UNITS },
                }),
                axios.get(`${API_BASE_ENDPOINT}${API_VERSION}/air_pollution`, {
                    params: { lat, lon, appid: API_KEY },
                }),
            ]);

            setCurrentWeatherData(current.data);
            setForecastWeatherData(forecast.data);
            setAirQualityData(air.data);
        } catch (err) {
            console.error(err);
            setError("Unable to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchByCity = async (city) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct`,
                {
                    params: { q: city, limit: 1, appid: API_KEY },
                },
            );
            if (!res.data.length) throw new Error(`City "${city}" not found.`);
            const { lat, lon } = res.data[0];
            await fetchWeatherByCoords(lat, lon);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchByGeolocation = () => {
        if (!navigator.geolocation) {
            fetchByCity("Kuala Lumpur");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => fetchByCity("Kuala Lumpur"),
            { timeout: 10000 },
        );
    };

    useEffect(() => {
        if (inputCity.trim()) {
            fetchByCity(inputCity);
        } else {
            fetchByGeolocation();
        }
    }, [inputCity]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar
                setInputCity={setInputCity}
                onLocate={fetchByGeolocation}
                currentWeatherData={currentWeatherData}
                loading={loading}
            />
            <Dashboard
                currentWeatherData={currentWeatherData}
                forecastWeatherData={forecastWeatherData}
                airQualityData={airQualityData}
                loading={loading}
                error={error}
            />
        </div>
    );
}

export default App;
