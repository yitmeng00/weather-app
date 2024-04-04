import { useState, useEffect } from "react";
import Sidebar from "./layouts/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import axios from "axios";

function App() {
    const [inputCity, setInputCity] = useState("");
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastWeatherData, setForecastWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (inputCity.trim() !== "") {
                    const latLongResp = await axios.get(
                        `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${
                            import.meta.env.VITE_REACT_APP_OPEN_WEATHER_APPID
                        }`
                    );
                    if (isMounted) {
                        const { lat, lon } = latLongResp.data[0];

                        // Fetch current weather data
                        const currentWeatherResp = await axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
                                import.meta.env
                                    .VITE_REACT_APP_OPEN_WEATHER_APPID
                            }&units=metric&lang=en`
                        );
                        if (isMounted) {
                            setCurrentWeatherData(currentWeatherResp.data);
                        }

                        // Fetch forecast weather data
                        const forecastWeatherResp = await axios.get(
                            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
                                import.meta.env
                                    .VITE_REACT_APP_OPEN_WEATHER_APPID
                            }&units=metric&lang=en`
                        );
                        if (isMounted) {
                            setForecastWeatherData(forecastWeatherResp.data);
                        }

                        // Fetch air quality data
                        const airQualityResp = await axios.get(
                            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${
                                import.meta.env
                                    .VITE_REACT_APP_OPEN_WEATHER_APPID
                            }`
                        );
                        if (isMounted) {
                            setAirQualityData(airQualityResp.data);
                        }
                    }
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;

                            // Fetch current weather data
                            const currentWeatherResp = await axios.get(
                                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                                    import.meta.env
                                        .VITE_REACT_APP_OPEN_WEATHER_APPID
                                }&units=metric&lang=en`
                            );
                            if (isMounted) {
                                setCurrentWeatherData(currentWeatherResp.data);
                            }

                            // Fetch forecast weather data
                            const forecastWeatherResp = await axios.get(
                                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
                                    import.meta.env
                                        .VITE_REACT_APP_OPEN_WEATHER_APPID
                                }&units=metric&lang=en`
                            );
                            if (isMounted) {
                                setForecastWeatherData(
                                    forecastWeatherResp.data
                                );
                            }

                            // Fetch air quality data
                            const airQualityResp = await axios.get(
                                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${
                                    import.meta.env
                                        .VITE_REACT_APP_OPEN_WEATHER_APPID
                                }`
                            );
                            if (isMounted) {
                                setAirQualityData(airQualityResp.data);
                            }
                        },
                        (error) => {
                            console.error(
                                "Error getting geolocation:",
                                error.message
                            );
                        }
                    );
                } else {
                    console.error(
                        "Geolocation is not supported by this browser."
                    );
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [inputCity]);

    return (
        <>
            <div className="flex flex-row h-screen">
                <Sidebar
                    setInputCity={setInputCity}
                    currentWeatherData={currentWeatherData}
                />
                <Dashboard
                    currentWeatherData={currentWeatherData}
                    forecastWeatherData={forecastWeatherData}
                    airQualityData={airQualityData}
                />
            </div>
        </>
    );
}

export default App;
