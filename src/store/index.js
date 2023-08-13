import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import { API_URL } from '@/constants/constants';

const api = axios.create({
    baseURL: API_URL,
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
            router.push({ name: 'Login' });
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await api.post('/auth/login', { email, password });
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
                if (error.response && error.response.status === 401) {
                    commit('LOGOUT');
                }
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
                this.commit('SET_LOADING', false);
                if (error.response && error.response.status === 401) {
                    this.commit('LOGOUT');
                }
                if (error.response) {
                    return Promise.reject(error.response.data);
                }
                console.error('Add task error:', error);
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
                this.commit('SET_LOADING', false);

                if (error.response && error.response.status === 401) {
                    this.commit('LOGOUT');
                }
                console.error('Delete task error:', error);
            }
        },
        async updateTaskStatus({ dispatch }, { id, status }) {
            try {
                this.commit('SET_LOADING', true);
                await api.put(`/tasks/${id}`, { status }, {
                    headers: {
                        Authorization: `Bearer ${this.state.authToken}`,
                    },
                });
                dispatch('fetchTasks'); // Refresh task list after status update
            } catch (error) {
                this.commit('SET_LOADING', false);
                if (error.response && error.response.status === 401) {
                    this.commit('LOGOUT');
                }
                if (error.response) {
                    return Promise.reject(error.response.data);
                }
                console.error('Update task status error:', error);
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
                if (error.response && error.response.status === 401) {
                    commit('LOGOUT');
                }
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
