import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAllRecords, deleteRecord } from "../services";

const Records = (props) => {
    const [records, setRecords] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if(props.user){
            getAllRecords().then((fetchedRecords) => setRecords(fetchedRecords));
        }else{
            history.push('/');
        }
        
    }, []);

    const handleDelete = async (record) => {
        await deleteRecord(record)
    }

    return(
        <section>
            {records?.map((record) => (
                <div>
                    <img src={record.album_art} alt="album cover art"></img>
                    <h3>{record.name}</h3>
                    <h4>{record.year_pressed}</h4>
                    <h5>{record.catalog_number}</h5>
                    <button onClick={handleDelete(record.id)}>Delete</button>
                </div>
            ))}
        </section>
    )
}

export default Records;