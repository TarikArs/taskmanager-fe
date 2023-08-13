<template>
    <nav class="bg-white shadow-sm p-4">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="text-2xl font-semibold text-gray-800">
                My Tasks
            </router-link>
            <!-- Navigation Links -->
            <div class="space-x-4">
                <!-- Add Task Button -->
                <router-link to="/add-task"
                    class="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded transition-colors">
                    Add a Task
                </router-link>
                <!-- Logout Link -->
                <router-link to="/logout" class="text-gray-700 hover:underline transition-colors">
                    Logout
                </router-link>
            </div>
        </div>
    </nav>
</template>
  