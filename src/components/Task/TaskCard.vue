<template>
  <div class="border rounded p-4 shadow-md bg-white">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <div class="flex items-center space-x-2">

        <input v-if="task.status === 0" type="checkbox" class="rounded border h-6 w-6" :checked="task.done"
          @change="updateTaskStatus" />
        <button @click="deleteTask" class="text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <p class="text-gray-600">{{ task.description }}</p>
    <div class="mt-2">
      <span class="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-200 text-blue-800"
        v-if="task.status === 0">
        Todo
      </span>
      <span class="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-200 text-green-800"
        v-else-if="task.status === 1">
        Done
      </span>
      <span class="inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-200 text-gray-800" v-else>
        Unknown
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async updateTaskStatus() {
      try {
        const res = await this.$store.dispatch('updateTaskStatus', {
          id: this.task._id,
          status: 1
        });
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTask() {
      try {
        const res = await this.$store.dispatch('deleteTask', this.task._id);
        console.log(res);

      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

  