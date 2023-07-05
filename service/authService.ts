import { Login } from "../model/login";
const axios = require('axios');

module.exports.login = async function (login: Login): Promise<void> {
    try{
        const response = await axios.post('http://localhost:8080/api/login', login)

        return response.data
    }catch(e){
        throw new Error('Could not login')
    }
}

module.exports.register = async function (login: Login): Promise<void> {
    try{
        const response = await axios.post('http://localhost:8080/api/register', login)

        return response.data
    }catch(e){
        throw new Error('Could not register')
    }
}