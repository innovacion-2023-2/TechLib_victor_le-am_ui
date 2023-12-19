import axios from "axios";
const BASE_URL = 'http://localhost:8080/auth';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export function registerUser(user) {
    return axiosInstance
        .post(`${BASE_URL}/register`, user)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
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

export { axiosInstance };
