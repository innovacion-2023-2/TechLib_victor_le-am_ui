<template>
    <div class="separador-navbar">
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(publicacion, index) in publicaciones" :key="index">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-body">
                                <h2 class="card-title">{{ publicacion.titulo }}</h2>
                                <p class="card-text">estado:{{ publicacion.estado }} </p>
                            </div>
                            <router-link :to="{ name: 'DetallePublicacion', params: { id: publicacion.id } }">
                                <button class="btn">Ver mas detalles</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPublicaciones } from '../services/publicacion.js';
export default {
    data() {
        return {
            publicaciones: []
        }
    },
    mounted() {
        this.obtenerPublicaciones();
    },
    methods: {
        obtenerPublicaciones() {
            getPublicaciones()
                .then(data => {
                    this.publicaciones = data;
                })
                .catch(error => {
                    console.error('Error al obtener las publicaciones:', error);
                });
        },
    },
}
</script>


<style scoped></style>