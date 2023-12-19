import { createRouter, createWebHistory } from 'vue-router'
import Crear from './views/Crear.vue'
import CrearUsuario from './views/CrearUsuario.vue'
import DetallePublicacion from './views/DetallePublicacion.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Libro from './views/MisLibros.vue'
import Modificar from './views/Modificar.vue'

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        meta: { showNavBar: false }
    },
    {
        path: "/Crear",
        name: "Crear",
        component: Crear,
        meta: { showNavBar: true }
    },
    {
        path: "/Modificar/:id",
        name: "Modificar",
        component: Modificar,
        props: true,
        meta: { showNavBar: true }
    },
    {
        path: "/Libro",
        name: "Libro",
        component: Libro,
        meta: { showNavBar: true }
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: { showNavBar: true }
    },
    {
        path: "/crear-usuario",
        name: "crear-usuario",
        component: CrearUsuario,
        meta: { showNavBar: false }
    },
    {
        path: '/detalle/:id',
        name: 'DetallePublicacion',
        component: DetallePublicacion,
        props: true,
        meta: { showNavBar: true }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router