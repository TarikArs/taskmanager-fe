<template>
        <login-form :loading="loading"  @login="handleLogin" />
</template>
  
<script>
import LoginForm from '@/components/Authentification/LoginForm.vue'
import store from '@/store';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            errorMessage: '',
            loading: false,
        };
    },
    methods: {
        async handleLogin(credentials) {
            try {
                /** start loading */
                this.loading = true;
                this.errorMessage = '';
                await store.dispatch('login', credentials);
                store.getters.isAuthenticated ? this.$router.push('/') : this.errorMessage = 'Invalid credentials';
                this.loading = false;
            } catch (error) {
                this.errorMessage = 'Invalid credentials';
                this.loading = false;
                console.log(error);
            }
        },
    },
};
</script>
  