import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView';
import TaskView from '../views/TaskView';
import store from '../store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/',
        name: 'Home',
        component: TaskView,
        meta: {
            requiresAuth: true,
        },
    },
];
 export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.getters.isAuthenticated;
    console.log('requiresAuth:', requiresAuth, 'isAuthenticated:', isAuthenticated);

    if (requiresAuth && !isAuthenticated) {
        // Redirect to login if authentication is required and user is not authenticated
        next('/login');
    } else if (!requiresAuth && isAuthenticated) {
        // Redirect to / if no authentication is required and user is authenticated
        next('/');
    } else {
        next(); // Proceed to the requested route
    }
});

export default router;