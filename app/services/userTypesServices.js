import { 
    getAllUserTypes,
    getSingleUserTypes,
    createUserTypes, 
    updateUserTypes,
    deleteUserTypes
} from '../models/userTypesModel';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

const getAllUserTypesService = async () => {
    try {
        const response = await getAllUserTypes();  
        return { status: response.status, data: response };
    } catch(e) {
        return { status: status.error, data: e.message };
    }
}

const getSingleUserTypesService = async (id) => {
    try {
        const response = await getSingleUserTypes(id);  
        return { status: response.status, data: response };
    } catch(e) {
        return { status: status.error, data: e.message };
    }
}

const createUserTypesService = async (name) => {
    try {
        const response = await createUserTypes(name);  
        return { status: response.status, data: response };
    } catch(e) {
        return { status: status.error, data: e.message };
    }
}

const updateUserTypesService = async (id, name) => {
    try {
        const response = await updateUserTypes(id, name);  
        return { status: response.status, data: response };
    } catch(e) {
        return { status: status.error, data: e.message };
    }
}
   
const deleteUserTypesService = async (id) => {
    try {
        const response = await deleteUserTypes(id);  
        return { status: response.status, data: response };
    } catch(e) {
        return { status: status.error, data: e.message };
    }
}
module.exports = {
    getAllUserTypesService,
    getSingleUserTypesService,
    createUserTypesService,
    updateUserTypesService,
    deleteUserTypesService
}
