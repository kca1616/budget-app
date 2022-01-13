import { useState } from "react";
import { useParams } from "react-router";
import { createRecord, updateRecord, addToMarketplace } from "../services";
import { useHistory } from 'react-router-dom';

const Listing = () => {
    const [name, setName] = useState("");
    const [yearPressed, setYearPressed] = useState("");
    const [catalogNumber, setCatalogNumber] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [notes, setNotes] = useState("");
    const [price, setPrice] = useState(0);
    const params = useParams();
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
        createRecord(newRecord).then(({ data }) => {
            const newMarkRecord = {
                record: data.id,
                price: price
            }
            addToMarketplace(newMarkRecord).then((res) => console.log(res))
        }).catch((err) => console.log(err))
        history.push("/marketplace");
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
            <label htmlFor="notes">Notes:</label>
            <input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
            />
            <label htmlFor="price">Price:</label>
            <input
                id="price"
                type="integer"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    )

}

export default Listing;