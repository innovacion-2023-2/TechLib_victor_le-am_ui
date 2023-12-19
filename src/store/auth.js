import axios from "axios";
import { defineStore } from "pinia";

export const AuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        rol: null,
        id: null,
        estadoCuenta: null,
        enabled: null,
        accountNonExpired: null,
        credentialsNonExpired: null,
        accountNonLocked: null,
        persistentRememberMeToken: null,
        BASE_URL: "http://localhost:8080",
        nombre: null,
        apellido: null,
        correo: null,
        actDatos: false,
    }),

    actions: {
        async signIn(correo, password) {
            const response = await axios
                .post(
                    `${this.BASE_URL}/auth/login`,
                    { correo: correo, contraseña: password },
                    {
                        headers: {
                            // AUTHORIZATION: `Bearer ${this.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    this.token = response.data;
                    this.getRol();
                });
        },
        async getRol() {
            if (this.token) {
                const response = await axios
                    .get(`${this.BASE_URL}/api/privado/sesion`, {
                        headers: {
                            AUTHORIZATION: `Bearer ${this.token}`,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        console.log(response.data);
                        this.id = response.data.id;
                        this.rol = response.data.rol;
                        this.estadoCuenta = response.data.estadoCuenta;
                        this.enabled = response.data.enabled;
                        this.accountNonExpired = response.data.accountNonExpired;
                        this.credentialsNonExpired = response.data.credentialsNonExpired;
                        this.accountNonLocked = response.data.accountNonLocked;
                        this.nombre = response.data.nombre;
                        this.apellido = response.data.apellido;
                        this.correo = response.data.correo;
                    });
            }
            console.log(this.token)
        },

    },
});
export default AuthStore;