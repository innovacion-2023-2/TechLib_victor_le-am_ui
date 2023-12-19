<template>
    <div class="row mt-4 m-1">
        <div class="col-2" style="background-color: #f0f0f0; height: 103vh;">
            <NavbarLateral />
        </div>
        <div class="col-10 p-4 " style="background-color: #ffffff">
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <h2 class="mb-4">Crear Publicación</h2>
                        <form @submit.prevent="crearPublicacion">
                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripción:</label>
                                <textarea v-model="publicacion.descripcion" class="form-control"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="estado" class="form-label">Estado:</label>
                                <select v-model="publicacion.estado" class="form-select">
                                    <option value="DISPONIBLE">Disponible</option>
                                    <option value="NO_DISPONIBLE">No Disponible</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="titulo" class="form-label">Título:</label>
                                <input type="text" v-model="publicacion.titulo" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Crear
                                Publicación</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import AuthStore from '../store/auth';

export default {
    components: {
    },
    data() {
        return {
            publicacion: {
                descripcion: '',
                estado: '',
                titulo: '',
            }, auth: AuthStore(),
        };
    },
    mounted() {
        //this.crearPublicacion();
    },
    methods: {
        async crearPublicacion() {

            const datosPublicacion = {
                descripcion: this.publicacion.descripcion,
                estado: this.publicacion.estado,
                titulo: this.publicacion.titulo
            };

            const url = 'http://localhost:8080/publicaciones/crear';
            console.log("token " + this.auth.token)
            const token = this.auth.token;

            const formData = new FormData();
            formData.append('publicacion', new Blob([JSON.stringify(datosPublicacion)], { type: 'application/json' }));


            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            try {
                const response = await axios.post(url, formData, config);

                console.log('Respuesta del servidor:', response.data);
                this.$router.push('/home');
            } catch (error) {
                console.error('Error al enviar los datos:', error);
                // Manejar el error aquí, si es necesario
            }
        }
        ,
    }
};
</script>