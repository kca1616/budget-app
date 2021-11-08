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
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/new">Add a new Record/Pressing</Link>
            <Link to="/records">Records</Link>
            <button onClick={handleClick}>Log Out</button>
        </nav>
    );
};

export default Nav