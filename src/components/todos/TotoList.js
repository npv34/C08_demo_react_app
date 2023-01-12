import axios from "axios";
import {Component} from "react";

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
        }
    }

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
            this.setState({todos: response.data})
        })
    }

    componentDidMount() {
        console.log('1')
    }

    render() {
        return (
            <>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.todos.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.completed ? "True" : "False"}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </>
        )
    }
}

export default TodoList;
