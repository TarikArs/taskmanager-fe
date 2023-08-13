<template>

    <div class="flex flex-col min-h-screen">
    <!-- nav bar -->
    <task-navbar />

    <!-- page content -->
    <router-view class="flex-1" />

    <!-- footer -->
    <task-footer />
  </div>
</template>
<script>
import router from '@/router';
import TaskNavbar from '@/components/Task/TaskNavbar';
import TaskFooter from '@/components/Task/TaskFooter';

export default {
    components: {
        TaskNavbar,
        TaskFooter,
    },
    created() {
        if (!this.$store.getters.isAuthenticated) {
            router.push('/login');
        }
    },
};


</script>
