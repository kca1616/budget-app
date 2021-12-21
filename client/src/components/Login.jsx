import { useState } from "react";
import { login } from "../services";
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            username,
            password,
        };
        const user = await login(userInfo);
        props.setUser(user);
        history.push('/');
    }

    return (
        <section>
            <h3>Login</h3>
            <div className="form-container">
            <form className="login" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log in!</button>
            </form>
            </div>
        </section>
    );
};

export default Login;