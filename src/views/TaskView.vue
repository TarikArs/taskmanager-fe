<template>
    <!-- nav bar -->
    <task-navbar />
    <!-- page content -->
    <router-view />
    <!-- footer -->
    <task-footer />
</template>
<script>
import router from '@/router';
import TaskNavbar from '@/components/Task/TaskNavbar.vue';
import TaskFooter from '@/components/Task/TaskFooter.vue';

export default {
    components: {
        TaskNavbar,
        TaskFooter,
    },
    created() {
        if (this.$store.getters.isAuthenticated) {
            router.push('/login');
        }
    },
};


</script>