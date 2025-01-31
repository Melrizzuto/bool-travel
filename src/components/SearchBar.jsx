import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Searchbar({ data }) {
    const { search, setSearch } = useContext(GlobalContext);

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
                    value={search}
                    onChange={handleChangeInput}
                />
            </div>
        </>
    );
}

export default Searchbar;
