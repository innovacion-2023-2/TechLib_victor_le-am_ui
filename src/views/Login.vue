<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="username" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" class="form-control">
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary mb-2">Iniciar sesion</button>
                        <button type="button" class="btn btn-secondary" @click="createAccount">Crear Cuenta</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import AuthStore from '../store/auth';

export default {
    data() {
        return {
            username: '',
            password: '',
            auth: AuthStore(),
        };
    },
    methods: {
        async login() {
            try {
                await this.auth.signIn(this.username, this.password);
                this.$router.push('/home');
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
            }
        },
        createAccount() {
            this.$router.push('/crear-usuario');
        },
    }
}
</script>