import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRecord } from "../services";

const NewRecord = () => {
    const [name, setName] = useState("");
    const [yearPressed, setYearPressed] = useState("");
    const [catalogNumber, setCatalogNumber] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [notes, setNotes] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecord = {
            name: name,
            year_pressed: yearPressed,
            catalog_number: catalogNumber,
            album_art: albumArt,
            notes: notes
        }
        await createRecord(newRecord);
        history.push("/records");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor="yearPressed">Year Pressed:</label>
            <input
                id="yearPressed"
                type="text"
                value={yearPressed}
                onChange={(e) => setYearPressed(e.target.value)}
                required
            />
            <label htmlFor="catalogNumber">Catalog Number:</label>
            <input
                id="catalogNumber"
                type="text"
                value={catalogNumber}
                onChange={(e) => setCatalogNumber(e.target.value)}
                required
            />
            <label htmlFor="albumArt">Link to Album Art:</label>
            <input
                id="albumArt"
                type="text"
                value={albumArt}
                onChange={(e) => setAlbumArt(e.target.value)}
                required
            />
            <label htmlFor = "notes">Notes:</label>
            <input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewRecord;