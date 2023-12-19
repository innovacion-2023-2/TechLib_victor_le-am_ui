<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Mi App</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/home">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Libro">Libros Publicados</router-link>
                    </li>
                    <li class="nav-item">
                        <input type="text" v-model="searchQuery" placeholder="Search" />
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Crear">Crear Publicacion</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            searchQuery: ''
        }
    },
    watch: {
        searchQuery(newQuery) {
            // Aquí puedes realizar alguna acción cuando el valor del buscador cambie
            console.log('Nuevo valor del buscador:', newQuery);
        }
    }
}
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 10px;
}

nav ul li a {
    text-decoration: none;
}
</style>