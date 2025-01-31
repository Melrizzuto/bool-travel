import { useContext } from "react"; // Assicurati di importare useContext
import { GlobalContext } from "../context/GlobalContext";

function Searchbar({ data }) {
    const { search, setSearch } = useContext(GlobalContext); // ✅ Moved inside Searchbar

    const filteredData = data
        .map(travel => ({
            ...travel,
            participants: travel.participants.filter(participant =>
                participant.firstName.toLowerCase().includes(search.toLowerCase()) ||
                participant.lastName.toLowerCase().includes(search.toLowerCase())
            )
        }))
        .filter(travel => travel.participants.length > 0);

    console.log(filteredData);

    const handleChangeInput = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <div className="form-group">
                <label htmlFor="searchBar"></label>
                <input
                    type="text"
                    className="form-control"
                    id="searchBar"
                    name="searchBar"
                    placeholder="Start searching..."
                    value={search} // Fix: use search directly from context
                    onChange={handleChangeInput}
                />
            </div>
        </>
    );
}

export default Searchbar;
