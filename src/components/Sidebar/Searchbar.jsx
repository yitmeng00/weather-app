import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

export function Searchbar({ setInputCity, onLocate, loading }) {
    const [city, setCity] = useState("");
    const [focused, setFocused] = useState(false);

    const handleSearch = () => {
        if (city.trim()) setInputCity(city.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="mb-8">
            <div className={`flex items-center rounded-xl px-4 py-0 border transition-all duration-200 bg-white/5 ${focused ? "border-sky-400/50 bg-sky-400/5" : "border-white/10"}`}>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-slate-400 py-3"
                    aria-label="Search for a city"
                />
                <button
                    onClick={onLocate}
                    disabled={loading}
                    className="pl-3 py-3 text-slate-400 hover:text-sky-400 transition-colors duration-150 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Use my location"
                    title="Use my location"
                >
                    <FontAwesomeIcon icon={faLocationCrosshairs} className="text-sm" />
                </button>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="pl-3 py-3 text-slate-400 hover:text-sky-400 transition-colors duration-150 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Search"
                >
                    <FontAwesomeIcon
                        icon={loading ? faSpinner : faSearch}
                        spin={loading}
                        className="text-sm"
                    />
                </button>
            </div>
        </div>
    );
}