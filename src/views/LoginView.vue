<template>
        <login-form  @login="handleLogin" />
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
        };
    },
    methods: {
        async handleLogin(credentials) {
            try {
                this.errorMessage = '';
                await store.dispatch('login', credentials);
                store.getters.isAuthenticated ? this.$router.push('/') : this.errorMessage = 'Invalid credentials';
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  