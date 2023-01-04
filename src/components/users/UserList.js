import * as React from 'react';
import {Button} from "@mui/material";
import {useEffect} from "react";

const data = [
    {
        id: '1',
        email: 'jone@gmail.com',
        age: 21,
        active: true,
        actions: null
    },
    {
        id: '2',
        email: 'nam@gmail.com',
        age: 22,
        active: true,
        actions: null
    },
    {
        id: '3',
        email: 'quang@gmail.com',
        age: 30,
        active: false,
        actions: null
    }
]

function UserList() {
    const [users, setUsers] = React.useState(data);
    const [indexUserDelete, setIndexUserDelete] = React.useState([])

    const handleChangeStatus = (index) => {
        users[index].active = !data[index].active;
        setUsers([...users])
    };

    const handleChooseUserDelete = (index) => {
        if (indexUserDelete.indexOf(index) === -1) {
            setIndexUserDelete([...indexUserDelete, index])
        } else {
            let data = [...indexUserDelete];
            data.splice(data.indexOf(index), 1);
            setIndexUserDelete([...data])
        }
    }

    const handleDeleteUser = () => {
        // xu ly xoa
        let arr = users
        for (let i = 0; i < indexUserDelete.length; i++) {
           arr = arr.filter((user) => user.id !== indexUserDelete[i])
        }
        setUsers([...arr])
    }

    useEffect(() => {
        console.log(indexUserDelete)
    }, [indexUserDelete])


    return (
        <div style={{ height: 400, width: '100%' }}>
            <div className="card">
                <div className="card-header">
                    Danh sách người dùng
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th><input className="form-check-input" type="checkbox"/></th>
                            <th>#</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user,index) => (
                            <tr key={user.id}>
                                <td><input className="form-check-input" type="checkbox" onChange={() => handleChooseUserDelete(user.id)}/></td>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <span className={user.active ? "badge bg-success" : "badge bg-secondary"}>{user.active ? "Active" : "Disabled" }</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id={user.id + "-btn-active"}
                                               checked={user.active} onChange={() => handleChangeStatus(index)}  />

                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={handleDeleteUser} type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default UserList;
