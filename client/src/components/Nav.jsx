import { Link, useHistory } from "react-router-dom";
import { logout } from "../services";


const Nav = (props) => {
    const history = useHistory();

    const handleClick = async () => {
        await logout();
        props.setUser(null);
        history.push("/");
    }

    return (
        <div>
        {!props.user ? 
            <nav>
            <Link to="/login" className="navItem">Login</Link>
            <Link to="/register" className="navItem">Register</Link>
            </nav> : null}
        {(props.user !== null && props.user !== undefined) ? 
            <nav>
                <Link to="/new" className="navItem">Add a new Record/Pressing</Link>
                <Link to ="/wishlist" className="navItem">Wishlist</Link> 
                <Link to="/records" className="navItem">Records</Link>
                <button onClick={handleClick}>Log Out</button> 
            </nav> : null}
        </div>
    );
};

export default Nav