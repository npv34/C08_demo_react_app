import axios from "axios";

const getDetail = async (id) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
}

export {
    getDetail
}
