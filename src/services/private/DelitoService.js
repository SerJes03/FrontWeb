import { axiosConfig } from "../../config/axiosConfig";

export const getById = async (id) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.get(
        process.env.REACT_APP_BASE_URL + `/delitos/delito/${id}`,
    );
}

export const crear = async (delito = {}) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.post(
        process.env.REACT_APP_BASE_URL+"/delitos", delito
    );
}

export const update = async (delito = {}, id) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.put(
        process.env.REACT_APP_BASE_URL+`/delitos/update/${id}`, delito
    );
}


export const deleteDelito = async(id) =>{
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.delete(
        `${process.env.REACT_APP_BASE_URL}/delitos/delete/${id}`
    );
}
