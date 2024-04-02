export function ForecastWeather() {
    return (
        <div>
            <div className="mb-5">
                <p>3-day Forecast</p>
            </div>
            <div className="flex flex-row gap-5 mb-10">
                <div className="bg-white p-5 rounded-md text-center">
                    <div>
                        <p>6 AM</p>
                    </div>
                    <div>
                        <p>icon</p>
                    </div>
                    <div className="flex flex-row gap-3 justify-center">
                        <div>
                            <p>35°C</p>
                        </div>
                        <div>
                            <p>15°C</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md text-center">
                    <div>
                        <p>6 AM</p>
                    </div>
                    <div>
                        <p>icon</p>
                    </div>
                    <div className="flex flex-row gap-3 justify-center">
                        <div>
                            <p>35°C</p>
                        </div>
                        <div>
                            <p>15°C</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
