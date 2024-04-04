export function CityInfo({ currentWeatherData }) {
    if (!currentWeatherData) {
        return <div>Loading...</div>;
    }

    const {
        name,
        sys: { country },
    } = currentWeatherData;

    return (
        <div className="border border-black p-7 text-center rounded-md">
            <p id="weather__city-name">{`${name}, ${country}`}</p>
        </div>
    );
}
