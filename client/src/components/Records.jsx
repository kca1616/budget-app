import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAllRecords } from "../services";

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

    return(
        <section>
            {records?.map((record) => (
                <div>
                    <img src={record.album_art} alt="album cover art"></img>
                    <h3>{record.name}</h3>
                    <h4>{record.year_pressed}</h4>
                    <h5>{record.catalog_number}</h5>
                </div>
            ))}
        </section>
    )
}

export default Records;