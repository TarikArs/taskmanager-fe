import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});
const AUTH_TOKEN_KEY = 'authToken';
const store = createStore({
    state: {
        tasks: [],
        authToken: localStorage.getItem(AUTH_TOKEN_KEY),
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_AUTH_TOKEN(state, token) {
            state.authToken = token;
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        },
        LOGOUT(state) {
            state.authToken = null;
            localStorage.removeItem(AUTH_TOKEN_KEY);
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await api.post('/auth/login', { email, password });
                console.log('Login response:', response);
                const token = response.data.token;
                commit('SET_AUTH_TOKEN', token);
            } catch (error) {
                console.error('Login error:', error);
            }
        },
        async fetchTasks({ commit }) {
            try {
                const response = await api.get('/tasks', {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                commit('SET_TASKS', response.data);
            } catch (error) {
                console.error('Fetch tasks error:', error);
            }
        },
        async deleteTask({ dispatch }, taskId) {
            try {
                await api.delete(`/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after deletion
            } catch (error) {
                console.error('Delete task error:', error);
            }
        },
        async updateTaskStatus({ dispatch }, { taskId, newStatus }) {
            try {
                await api.put(`/tasks/${taskId}`, { status: newStatus }, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after status update
            } catch (error) {
                console.error('Update task status error:', error);
            }
        },
        async logout({ commit }) {
            try {
                await api.post('/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                commit('LOGOUT');
            } catch (error) {
                console.error('Logout error:', error);
            }
        },
    },
    getters: {
        getTasks(state) {
            return state.tasks;
        },
        isAuthenticated(state) {
            return !!state.authToken;
        },
        // Other getters
    },
});

export default store;
