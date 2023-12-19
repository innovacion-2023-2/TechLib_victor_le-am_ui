<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Crear Usuario</h5>
                <form @submit.prevent="registerUser">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" v-model="usuario.nombre" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="apellido">Apellido:</label>
                        <input type="text" id="apellido" v-model="usuario.apellido" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="correo">Correo Electrónico:</label>
                        <input type="email" id="correo" v-model="usuario.correo" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="contrasena">Contraseña:</label>
                        <input type="password" id="contrasena" v-model="usuario.contraseña" class="form-control" required>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary mt-3">Crear Usuario</button>
                        <button type="button" class="btn btn-secondary mt-3" @click="goToLogin">Regresar</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { registerUser } from '../services/usuario.js';
export default {
    data() {
        return {
            usuario: {
                nombre: "",
                apellido: "",
                correo: "",
                contraseña: "",
            },
        };
    },
    methods: {

        async registerUser() {
            try {
                const response = await registerUser(this.usuario).then((response) => {
                    console.log(this.usuario);
                    this.$router.push('/');
                });
                console.log(response);
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
            }
        },

        goToLogin() {
            this.$router.push('/');
        }
    }
}
</script>