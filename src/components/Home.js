import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <Link to="/login">Login</Link>
            <Link to="/admin/users">Users</Link>
        </>
    )
}

export default Home;
