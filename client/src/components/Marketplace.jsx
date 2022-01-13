import { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { getMarketplace } from "../services";

const Marketplace = (props) => {
    const [markets, setMarkets] = useState([]);
    const records = markets.map(mark => {
        return {
            record: mark.record,
            price: mark.price
        }
    });

    // const history = useHistory();

    useEffect(() => {
        getMarketplace().then((fetchedRecords) => setMarkets(fetchedRecords));
    }, []);

    // const handleDelete = async (record) => {
    //     await deleteRecord(record)
    // }

    return (
        <section>
            {records.length ?
                records.map(({ record, price }) => (
                    <div className="record-library">
                        <img src={record.album_art} alt="album cover art"></img>
                        <h3>{record.name}</h3>
                        <h4>{record.year_pressed}</h4>
                        <h5>{record.catalog_number}</h5>
                        <h6>{`$${price}`}</h6>
                        {/* <button onClick={()=> addFavorite(record.id)}>Add to Wishlist</button> */}
                        {/* <Link to={`/edit/${record.id}`}><button>Edit</button></Link> */}
                        {/* {props.user ==?
                        <button onClick={() => handleDelete(record.id)}>Delete</button>
                        : null} */}
                    </div>
                )) : <p>Marketplace is empty.</p>}
        </section>
    )
}

export default Marketplace;