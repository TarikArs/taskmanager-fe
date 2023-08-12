<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">
            <span v-if="!this.$store.state.loading">Task list</span>
            <div v-if="this.$store.state.loading"
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </h2>
        <div class="grid grid-cols-12 gap-4">
            <task-card v-for="task in tasks" :key="task.id" :task="task" class="col-span-3 h-[200px]" />
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import TaskCard from './TaskCard.vue';

export default {
    components: {
        TaskCard,
    },
    computed: {
        ...mapGetters(['getTasks']),
        tasks() {
            return this.getTasks;
        },
    },
    created() {
        this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            try {
                await this.$store.dispatch('fetchTasks');
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  