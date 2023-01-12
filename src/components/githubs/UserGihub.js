import {useEffect, useState} from "react";
import {findUser, getUsers} from "../../service/githubService";
import {toast} from "react-toastify";

function UserGithub() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(result => {
            setUsers(result.data)
        });
    }, []);

    const handleSearch = (e) => {
        let keywords = e.target.value;

        findUser(keywords).then(res => {
            console.log(res);
            setUsers(res.data.items)
        }).catch(err => {
            toast.error(err.message)
        })

        console.log(keywords)
    }

    return (
        <>
            <input type="text" onChange={handleSearch}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user,index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.login}</td>
                        <td><img src={user.avatar_url} alt="" width="100"/></td>
                        <td><a href={user.html_url}>{user.html_url}</a></td>
                    </tr>

                ))}

                </tbody>
            </table>
        </>
    )
}

export default UserGithub;
