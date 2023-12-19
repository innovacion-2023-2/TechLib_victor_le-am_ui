import axios from "axios";
const BASE_URL = 'http://localhost:8080/publicaciones';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export function getPublicaciones() {
    return axiosInstance
        .get(`${BASE_URL}/ver`)
        .then((response) => response.data)
        .catch((error) => {
            //console.log(error);
            if (error.response.status === 404) {
                console.log(error.message)
            }
            return {
                error: true,
                name: error.response.data?.error?.name || "Error",
                message: error.response.data?.error || "Error",
            };
        });
}
export function getPublicacionesById(id, config) {
    return axiosInstance
        .get(`${BASE_URL}/id?id=${id}`, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 404) {
                console.log(error.message)
            }
            return {
                error: true,
                name: error.response?.data?.error?.name || "Error",
                message: error.response?.data?.error || "Error",
            };
        });
}
export function deletePublicacionesById(id, config) {
    return axiosInstance
        .delete(`${BASE_URL}/eliminar?id=${id}`, config)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 404) {
                console.log(error.message)
            }
            return {
                error: true,
                name: error.response?.data?.error?.name || "Error",
                message: error.response?.data?.error || "Error",
            };
        });
}
export function getPublicacionesByPalabra(palabra) {
    return axiosInstance
        .get(`${BASE_URL}/buscarPorPalabra?palabra=${palabra}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 404) {
                console.log(error.message);
            }
            return {
                error: true,
                name: error.response?.data?.error?.name || "Error",
                message: error.response?.data?.error || "Error",
            };
        });
}



export { axiosInstance };
