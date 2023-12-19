<template>
    <div>
        <div class="row mt-4 m-1">

            <div class="col-12 mt-2 p-4" style="background-color: #ffffff">
                <div class="container p-1">
                    <h1 class="mt-4">Mis Libros</h1>
                    <div v-if="loading">Cargando tus Libros...</div>
                    <div v-else>
                        <div v-if="publicaciones.length === 0">
                            No hay Libros para mostrar.
                        </div>
                        <div v-else>
                            <h1>Bienvenido {{ auth.nombre }}</h1>
                            <div v-for="publicacion in filteredPublicaciones" :key="publicacion.id"
                                class="row mb-4 container-publicacion">
                                <div class="col-md-4">
                                </div>
                                <div class="col-md-6">
                                    <div class="p-3">
                                        <p><strong>Titulo:</strong> {{ publicacion.titulo }}</p>
                                        <p><strong>Estado:</strong> {{ publicacion.estado }}</p>
                                        <p><strong>Descripción:</strong> {{ publicacion.descripcion }}</p>
                                        <p><strong>Autor:</strong> {{ publicacion.autor }}</p>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <button @click="redireccionarModificar(publicacion.id)"
                                                class="btn btn-primary w-100">Modificar</button>
                                        </div>
                                        <div class="col">
                                            <button @click="abrirModalEliminar(publicacion)"
                                                class="btn btn-danger w-100">Eliminar</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDeleteModal" class="modal">
            <div class="modal-content">
                <span @click="closeModal" class="close">&times;</span>
                <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
                <div class="modal-buttons">
                    <button @click="eliminarPublicacion" :disabled="loadingDelete" class="btn btn-danger">
                        <span v-if="loadingDelete">Eliminando...</span>
                        <span v-else>Eliminar</span>
                    </button>
                    <button @click="closeModal" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { deletePublicacionesById, getPublicaciones } from '../services/publicacion.js';
import AuthStore from '../store/auth';


export default {
    components: {
    },
    name: "MisPublicaciones",
    data() {
        return {
            publicaciones: [],
            loading: true,
            showDeleteModal: false,
            publicacionAEliminar: null,
            loadingDelete: false,
            auth: AuthStore(),
        };
    },
    mounted() {
        this.getPublicaciones2();
    },
    methods: {
        getPublicaciones2() {
            getPublicaciones()
                .then(data => {
                    this.publicaciones = data;
                    this.loading = false
                })
                .catch(error => {
                    // Manejo de errores si la solicitud falla
                    console.error('Hubo un error al obtener la publicación:', error);
                    this.loading = false;
                });
        },
        redireccionarModificar(idPublicacion) {
            this.$router.push({
                name: 'Modificar',
                params: {
                    id: idPublicacion
                }
            });
        },
        abrirModalEliminar(publicacion) {
            this.publicacionAEliminar = publicacion;
            this.showDeleteModal = true;
        },
        closeModal() {
            this.showDeleteModal = false;
            this.publicacionAEliminar = null;
        },
        eliminarPublicacion() {
            if (this.publicacionAEliminar) {
                const idPublicacionAEliminar = this.publicacionAEliminar.id;

                this.loadingDelete = true; // Activar el indicador de carga

                deletePublicacionesById(idPublicacionAEliminar)
                    .then(() => {
                        this.publicaciones = this.publicaciones.filter(
                            publicacion => publicacion.id !== idPublicacionAEliminar
                        );
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error('Error al eliminar la publicación:', error);
                        // Manejo de error
                    })
                    .finally(() => {
                        this.loadingDelete = false; // Asegurar que el indicador de carga se desactive
                    });
            }
        }
    },
    computed: {
        filteredPublicaciones() {
            console.log(this.publicaciones.id + "id de la publicacionnn");
            return this.publicaciones.filter(publicacion => publicacion.cuenta.id === this.auth.id);
        },
    },
};
</script>
  
<style scoped>
/* ... */
.imagen-container img {
    width: 100%;
    height: auto;
}

.container-publicacion {
    background-color: #ebf0ec;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.imagen-container {
    width: 200px;
    height: 200px;
    overflow: hidden;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 28%;
    border-radius: 20px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-buttons {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
}
</style>
