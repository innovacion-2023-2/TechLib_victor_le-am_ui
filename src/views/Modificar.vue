<template>
    <div>
        <div class="row mt-4 m-1">
            <div class="col-12" style="background-color: #ffffff">
                <div class="container p-3">
                    <h1 class="mt-4">Modificar Libro</h1>
                    <form @submit.prevent="modificarPublicacion">

                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción:</label>
                            <textarea v-model="publicacion.descripcion" class="form-control"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="estado" class="form-label">Estado:</label>
                            <select v-model="publicacion.estado" class="form-select">
                                <option value="DISPONIBLE">Disponible</option>
                                <option value="RENTADO">No Disponible</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="titulo" class="form-label">Título:</label>
                            <input type="text" v-model="publicacion.titulo" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">Modificar Publicación</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { getPublicacionesById } from '../services/publicacion.js';
import AuthStore from '../store/auth';

export default {
    components: {
    },
    name: "ModificarPublicacion",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            publicacion: {
                categoria: '',
                descripcion: '',
                estado: '',
                precio: null,
                tipoProducto: '',
                titulo: ''
            },
            auth: AuthStore(),
        };
    },
    mounted() {
        this.getPublicaciones();
    },
    methods: {
        getPublicaciones() {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            };

            getPublicacionesById(this.id, config)
                .then(data => {
                    this.publicacion = data;
                })
                .catch(error => {
                    console.error('Error al obtener las publicaciones:', error);
                });
        },
    },
    async modificarPublicacion() {
        const datosPublicacion = {
            descripcion: this.publicacion.descripcion,
            estado: this.publicacion.estado,
            autor: this.publicacion.autor,
            titulo: this.publicacion.titulo
        };

        const formData = new FormData();
        formData.append('publicacion', new Blob([JSON.stringify(datosPublicacion)], { type: 'application/json' }));
        const token = this.auth.token;

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            const response = await axios.put(`http://localhost:8080/publicaciones/actualizar/${this.id}`, formData, config);

            console.log('Publicación actualizada exitosamente:', response.data);
            this.$router.push('/');
        } catch (error) {
            console.error('Error al actualizar la publicación:', error);
        }
    }
}
</script>