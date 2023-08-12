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
        loading: false,
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_AUTH_TOKEN(state, token) {
            state.authToken = token;
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        },
        SET_LOADING(state, isloading) {
            state.loading = isloading;
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
                commit('SET_LOADING', true);
                const response = await api.get('/tasks', {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                commit('SET_TASKS', response.data);
            } catch (error) {
                console.error('Fetch tasks error:', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async addTask({ dispatch }, task) {
            try {
                this.commit('SET_LOADING', true);
                await api.post('/tasks', task, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after addition
            } catch (error) {
                console.error('Add task error:', error);
            } finally {
                this.commit('SET_LOADING', false);
            }
        },
        async deleteTask({ dispatch }, taskId) {
            try {
                this.commit('SET_LOADING', true);
                await api.delete(`/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after deletion
            } catch (error) {
                console.error('Delete task error:', error);
            } finally {
                this.commit('SET_LOADING', false);
            }
        },
        async updateTaskStatus({ dispatch }, { id, status }) {
            try {
                this.commit('SET_LOADING', true);
                await api.put(`/tasks/${id}`,{status}, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after status update
            } catch (error) {
                console.error('Update task status error:', error);
            } finally {
                this.commit('SET_LOADING', false);
            }
        },
        async logout({ commit }) {
            try {
                commit('SET_LOADING', true);
                await api.post('/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                commit('LOGOUT');
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                commit('SET_LOADING', false);
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
