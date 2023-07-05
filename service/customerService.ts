import { Customer } from "../model/customer"
const axios = require('axios');


module.exports.getAllCustomerNames = async function(): Promise<String []>{
    try{
        const response = await axios.get('http://localhost:8080/api/customerName')

        return response.data
    }catch(e){
        throw new Error('Could not get customer names')
    }
}

module.exports.getCustomerIDFromName= function(name: String): Promise<number>{
    try{
        const response = axios.get('http://localhost:8080/api/customerID/' + name)

        return response.data
    }catch(e){
        throw new Error('Could not get customer id')
    }
}