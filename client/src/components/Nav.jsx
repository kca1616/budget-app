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
        <nav>
            {/* <Link to="/" className="navItem">Home</Link> */}
            {props.user == null ? <Link to="/login" className="navItem">Login</Link> : null}
            {props.user == null ? <Link to="/register" className="navItem">Register</Link> : null}
            {props.user !== null ? <Link to="/new" className="navItem">Add a new Record/Pressing</Link> : null}
            {props.user !== null ? <Link to ="/wishlist" className="navItem">Wishlist</Link> : null}
            {props.user !== null ?  <Link to="/records" className="navItem">Records</Link>: null}
            {props.user !==null ? <button onClick={handleClick}>Log Out</button> : null}
            
        </nav>
    );
};

export default Nav