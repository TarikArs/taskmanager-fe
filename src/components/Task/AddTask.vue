<template>
    <form @submit.prevent="addTask"
        class="w-full max-w-sm mx-auto mt-8 p-6 border-t-4 border-purple-500 rounded-lg shadow-md bg-white">
        <h2 class="text-2xl font-semibold mb-4 text-center">Add Task</h2>

        <div class="mb-4">
            <label class="block mb-2 font-semibold">Title</label>
            <input v-model="title" type="text" class="w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                placeholder="Enter task title" />
            <p v-if="titleError" class="text-red-500 mt-1">{{ titleError }}</p>
        </div>

        <div class="mb-4">
            <label class="block mb-2 font-semibold">Description</label>
            <textarea v-model="description"
                class="h-32 resize-none w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                placeholder="Enter task description"></textarea>
            <p v-if="descriptionError" class="text-red-500 mt-1">{{ descriptionError }}</p>
        </div>

        <button type="submit" class="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            <div v-if="isLoading"
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <span v-if="!isLoading">Add Task</span>
        </button>

        <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>
    </form>
</template>
  
<script>
import router from '@/router';

export default {
    data() {
        return {
            title: '',
            description: '',
            titleError: '',
            descriptionError: '',
            isLoading: false,
            successMessage: '',
        };
    },

    methods: {
        async addTask() {
            // Reset error messages
            this.titleError = '';
            this.descriptionError = '';
            this.successMessage = '';

            // Perform validation
            if (!this.title) this.titleError = 'Please enter task title';
            if (!this.description) this.descriptionError = 'Please enter task description';

            // If no errors, emit the addTask event
            if (!this.titleError && !this.descriptionError) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('addTask', {
                        title: this.title,
                        description: this.description,
                        status: 0,
                    });
                    this.isLoading = false;
                    this.title = '';
                    this.description = '';
                    this.successMessage = 'Task added successfully!';
                    router.push({ name: 'Home' });
                } catch (error) {
                    this.isLoading = false;
                    if (error.errors && error.errors.title) {
                        this.titleError = error.errors.title[0];
                    }
                }
            }
        },
    },
};
</script>
  