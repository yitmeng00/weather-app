import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function Searchbar({ setInputCity }) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        setInputCity(city);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="mb-8">
            <div className="relative">
                <input
                    type="text"
                    name="city-input"
                    id="weather__city-input"
                    placeholder="Search for a city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-3 border border-black rounded-md pe-10 w-full"
                />
                <button
                    onClick={handleSearch}
                    type="button"
                    className="absolute right-0 p-3"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}
