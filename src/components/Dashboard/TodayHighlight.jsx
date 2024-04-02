export function TodayHighlight() {
    return (
        <div>
            <div className="mb-5">
                <p>Today's Highlights</p>
            </div>
            <div className="grid grid-cols-6 gap-5 mb-10">
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Feels Like</p>
                    </div>
                    <div>
                        <p>35°C</p>
                    </div>
                    <div>
                        <p>Humidity is making it feel hotter.</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Humidity</p>
                    </div>
                    <div>
                        <p>69%</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Pressure</p>
                    </div>
                    <div>
                        <p>1, 009 hPa</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-md">
                    <div>
                        <p>Wind & Gusts</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>1.54</p>
                        </div>
                        <div>
                            <div>
                                <p>KM/H</p>
                            </div>
                            <div>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>14</p>
                        </div>
                        <div>
                            <div>
                                <p>KM/H</p>
                            </div>
                            <div>
                                <p>Gusts</p>
                            </div>
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
                            <p>6: 35 AM</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <p>icon</p>
                        </div>
                        <div>
                            <p>6: 35 AM</p>
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
                            <p>5</p>
                        </div>
                    </div>
                    <div>
                        <p>Components</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
