<template>
    <nav class="bg-white shadow-sm p-4">
        <div class="container mx-auto flex justify-between items-center">
           <!-- home icon -->
            <router-link to="/" class="text-2xl font-semibold text-gray-800">
               Home
            </router-link>
            <div>
                <!-- router link to add a task as button -->
                <router-link to="/add-task" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded">
                    Add a task
                </router-link>
                <router-link to="/logout" class="hover:underline">Logout</router-link>
            </div>
        </div>
    </nav>
</template>