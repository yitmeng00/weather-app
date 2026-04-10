import { useState, useEffect } from "react";
import Sidebar from "./layouts/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_APPID;

function App() {
    const [inputCity, setInputCity] = useState("");
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastWeatherData, setForecastWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Reusable fetch function
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);

            const [current, forecast, air] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: { lat, lon, appid: API_KEY, units: "metric" },
                }),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                    params: { lat, lon, appid: API_KEY, units: "metric" },
                }),
                axios.get(
                    `https://api.openweathermap.org/data/2.5/air_pollution`,
                    {
                        params: { lat, lon, appid: API_KEY },
                    },
                ),
            ]);

            setCurrentWeatherData(current.data);
            setForecastWeatherData(forecast.data);
            setAirQualityData(air.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    // Fetch by city
    const fetchByCity = async (city) => {
        try {
            const res = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct`,
                {
                    params: { q: city, limit: 1, appid: API_KEY },
                },
            );

            if (!res.data.length) {
                throw new Error("City not found");
            }

            const { lat, lon } = res.data[0];
            fetchWeatherByCoords(lat, lon);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch by geolocation
    const fetchByGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (err) => {
                console.warn("Geolocation error:", err.message);

                // Fallback to default city
                fetchByCity("Kuala Lumpur");
            },
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
        <div className="flex flex-col lg:flex-row h-screen">
            <Sidebar
                setInputCity={setInputCity}
                currentWeatherData={currentWeatherData}
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
