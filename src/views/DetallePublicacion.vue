<template>
    <div class="separador-navbar">
        <div class="container" v-if="publicacion">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">{{ publicacion.titulo }}</h2>
                    <p class="card-text">{{ publicacion.descripcion }}</p>
                    <p class="card-text">{{ publicacion.autor }}</p>
                    <p class="card-text">{{ publicacion.estado }}</p>
                    <p class="card-text">publicado por el bibliotecario :{{ auth.nombre }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPublicacionesById } from '../services/publicacion.js';
import AuthStore from '../store/auth';
export default {
    data() {
        return {
            publicacion: null,
            auth: AuthStore(),
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.getPublicaciones();
    }, async created() {
        const idPublicacion = Number(this.$route.params.id);
        this.publicacion = await getPublicacionesById(idPublicacion);
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
};
</script>