import {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class UserList extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            this.setState({users: response.data})
        })
    }

    handleDeleteUser(id) {
        let data = this.state.users.filter(user => user.id !== id);
        this.setState({users: data})
    }

    render() {
        return (
            <>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><Link to={"/admin/users/" + item.id}>  {item.name}</Link>
                              </td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => this.handleDeleteUser(item.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </>
        )
    }
}

export default UserList
