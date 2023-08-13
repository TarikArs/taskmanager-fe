<template>
    <form class="w-full max-w-sm mx-auto mt-8 p-6 border-t-4 border-purple-500 rounded-lg shadow-md bg-white">
        <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>

        <div class="mb-4">
            <label class="block mb-2 font-semibold">Email</label>
            <input v-model="email" type="email" class="w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                placeholder="Enter your email" />
            <p v-if="emailError" class="text-red-500 mt-1">{{ emailError }}</p>
        </div>

        <div class="mb-4">
            <label class="block mb-2 font-semibold">Password</label>
            <input v-model="password" type="password"
                class="w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                placeholder="Enter your password" />
            <p v-if="passwordError" class="text-red-500 mt-1">{{ passwordError }}</p>
        </div>

        <button @click.prevent="login" class="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            <div v-if="loading"
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <span v-if="!loading">Log In</span>
        </button>
    </form>
</template>
  
<script>

export default {
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loading: false,
        };
    },
    methods: {
        async login() {
            // Reset error messages
            this.emailError = '';
            this.passwordError = '';

            // Perform validation
            if (!this.email) this.emailError = 'Please enter your email';
            if (!this.password) this.passwordError = 'Please enter your password';

            // If no errors, perform login
            if (!this.emailError && !this.passwordError) {
                this.loading = true;

                try {
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password,
                    });

                    if (this.$store.getters.isAuthenticated) {
                        this.$router.push('/');
                    } else {
                        this.emailError = 'Invalid credentials';
                    }
                } catch (error) {
                    this.emailError = 'Invalid credentials';
                } finally {
                    this.loading = false;
                }
            }
        },
    },
};
</script>
  