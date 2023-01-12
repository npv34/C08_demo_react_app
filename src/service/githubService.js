import axios from "axios";
axios.defaults.baseURL = 'https://api.github.com/';

const getUsers = async () => {
    return await axios.get('/users')
}

const findUser = async (username) => {
    return await axios.get('/search/users', {
        params: {
            q: username
        }
    })
}

export {
    getUsers,
    findUser
}
