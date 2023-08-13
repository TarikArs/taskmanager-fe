// Import Vue Router and required components
import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView';
import HomeView from '../views/HomeView';
import TaskList from '../components/Task/TaskList';
import AddTask from '../components/Task/AddTask';
import store from '../store';

// Define routes for the application
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LandingView,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        redirect: { name: 'Tasks' },
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/my-tasks',
                name: 'Tasks',
                component: TaskList,
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: 'add-task',
                name: 'AddTask',
                component: AddTask,
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
    {
        path: '/logout',
        name: 'Logout',
        meta: {
            requiresAuth: true,
        },
        // Custom route guard using beforeEnter
        beforeEnter(to, from, next) {
            store.dispatch('logout');
            next('/login');
        },
    },
];

// Create the Vue Router instance
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard to handle authentication
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.getters.isAuthenticated;
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
