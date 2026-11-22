import { useState, useEffect, useCallback } from "react";
import Sidebar from "./layouts/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_VERSION = 2.5;
const API_BASE_ENDPOINT = "https://api.openweathermap.org/data/";
const UNITS = "metric";

function App() {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastWeatherData, setForecastWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeatherByCoords = useCallback(async (lat, lon) => {
        if (!API_KEY) {
            setError("Missing OpenWeather API key.");
            setLoading(false);
            return;
        }

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
    }, []);

    const fetchByCity = useCallback(async (city) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct`,
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
    }, [fetchWeatherByCoords]);

    const fetchByGeolocation = useCallback(() => {
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
    }, [fetchByCity, fetchWeatherByCoords]);

    // Load weather for the user's location once on mount. The only synchronous
    // setState path (no geolocation support -> fetchByCity) sets loading=true /
    // error=null, which already match the initial state, so no cascading render.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchByGeolocation();
    }, [fetchByGeolocation]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar
                onSearch={fetchByCity}
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
