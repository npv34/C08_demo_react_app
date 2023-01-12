import * as React from 'react';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
    const [users, setUsers] = useState(data);
    const [indexUserDelete, setIndexUserDelete] = useState([])
    const [errMessage, setErrorMessage] = useState('')
    const [form, setForm] = useState({
        id: Math.floor(Math.random() * 100),
        email: '',
        age: '',
        active: false
    });
    const handleChangeStatus = (index) => {
        users[index].active = !users[index].active;
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

    const createUserFormSchema = Yup.object().shape({
        age: Yup.number()
            .required('Required'),
        active: Yup.boolean()
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: form,
        onSubmit: (values, {resetForm, validateField}) => {
            setUsers([...users, values])
            setForm({...form, active: false})
            resetForm();
        },
        validationSchema: createUserFormSchema,
    });


    const handleChangeForm = (e) => {
        let data = e.target;
        if (data.name === 'email') {
            let patternEmail = /^[a-zA-Z0-9]+@([a-z]+\.)+(com|vn)$/;
            let email = data.value;
            if (!patternEmail.test(email)) {
                setErrorMessage('Email is not a valid email')
            } else {
                setErrorMessage('')
            }
        }
        setForm({...form, [data.name]: data.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsers([...users, form])
        setForm({
            id: Math.floor(Math.random() * 100) + "",
            email: '',
            age: '',
            active: true
        })
    }

    useEffect(() => {
        console.log(users)
    }, [users])

    return (

        <>
            <div className="row">
                <div className="col-12 col-md-4">

                    <div className="card">
                        <div className="card-header">
                            Them moi người dùng
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={formik.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input value={formik.values.email}
                                           type="email"
                                           name="email"
                                           className="form-control"
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}

                                           id="exampleInputEmail1"/>
                                    {formik.touched.email
                                        && formik.errors.email
                                        && (<p className="text-danger">{formik.errors.email}</p>)}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input value={formik.values.age}
                                           name="age"
                                           onChange={formik.handleChange}
                                           type="number" className="form-control"
                                           id="age"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <div className="form-check form-switch">
                                        {form.active ? "Active" : "Disabled"}
                                        <input
                                            onInput={() => setForm({...form, active: !form.active})}
                                            onChange={formik.handleChange}
                                            name="active"
                                            checked={form.active}
                                            className="form-check-input"
                                            type="checkbox"
                                               id=""
                                        />
                                    </div>
                                </div>
                                <div className="form-group">

                                    <button className="btn btn-primary" type="submit">Save</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-md-8">
                    <div style={{height: 400, width: '100%'}}>
                        <div className="card">
                            <div className="card-header">
                                Danh sách người dùng
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                    Thêm mới
                                </button>
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
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td><input className="form-check-input" type="checkbox"
                                                       onChange={() => handleChooseUserDelete(user.id)}/></td>
                                            <td>

                                                {index + 1}</td>
                                            <td><Link to={'/admin/users/' + user.id}>{user.email}</Link>

                                            </td>
                                            <td>{user.age}</td>
                                            <td>
                                                <span
                                                    className={user.active ? "badge bg-success" : "badge bg-secondary"}>{user.active ? "Active" : "Disabled"}</span>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                           id={user.id + "-btn-active"}
                                                           checked={user.active}
                                                           onChange={() => handleChangeStatus(index)}/>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <button onClick={handleDeleteUser} type="button" className="btn btn-danger">Delete
                                </button>
                            </div>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <form>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email
                                                    address</label>
                                                <input value={form.email} type="email" name="email"
                                                       onChange={(e) => handleChangeForm(e)} className="form-control"
                                                       id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                                {errMessage && (<p className="text-danger">{errMessage}</p>)}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputAge" className="form-label">Age</label>
                                                <input value={form.age} type="number" name="age"
                                                       onChange={(e) => handleChangeForm(e)} className="form-control"
                                                       id="exampleInputAge"
                                                       aria-describedby="ageHelp"/>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close
                                            </button>
                                            <button type="button" onClick={handleSubmit} className="btn btn-primary"
                                                    data-bs-dismiss="modal">Save changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default UserList;
