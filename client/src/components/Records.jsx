import { useEffect, useState } from "react";
import { getAllRecords } from "../services";

const Records = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        getAllRecords().then((fetchedRecords) => setRecords(fetchedRecords));
    }, []);

    return(
        <section>
            {records.map((record) => (
                <div>
                    <img src={record.albumArt} alt="album cover art"></img>
                    <h3>{record.name}</h3>
                    <h4>{record.yearPressed}</h4>
                    <h5>{record.catalogNumber}</h5>
                </div>
            ))}
        </section>
    )
}

export default Records;