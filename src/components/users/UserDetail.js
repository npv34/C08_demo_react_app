import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {getDetail} from "../../service/userService";



function UserDetail() {
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getDetail(id).then(res => {
            setUser(res.data)
        })
    },[])

    return (
        <>
            {user.name ? (<p>Name: {user.name}</p>) : (<p>Loading...</p>)}

        </>
    )
}

export default UserDetail;
