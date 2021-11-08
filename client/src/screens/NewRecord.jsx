import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRecord } from "../services";
import Form from '../components/Form.jsx';

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
    <Form handleSubmit={handleSubmit}/>
    );
};

export default NewRecord;