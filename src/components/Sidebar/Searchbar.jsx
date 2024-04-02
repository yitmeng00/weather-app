export function Searchbar() {
    return (
        <div className="mb-8">
            <input
                type="text"
                name="city-input"
                id="weather__city-input"
                placeholder="Search for a city"
                className="p-2 border border-black"
            />
        </div>
    );
}
