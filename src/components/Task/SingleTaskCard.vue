<template>
  <div class="rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-1 border-t-2 border-purple-500">
    <header class="flex items-center justify-between mb-2 border-b-[1px] pb-2">
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
      <h5 class="text-lg font-semibold">
        {{ task.title }}
      </h5>
      <div class="flex items-center space-x-2">
        <input v-if="task.status === 0" type="checkbox" class="rounded border h-6 w-6" :checked="task.done"
          title="Mark as done" @change="updateTaskStatus" />
        <button @click="deleteTask" class="text-red-500" :aria-label="`Delete ${task.title} task`">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
    <div class="max-h-50 overflow-y-auto mt-2">
      <p class="text-gray-600">{{ task.description }}</p>
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
        await this.$store.dispatch('updateTaskStatus', {
          id: this.task._id,
          status: 1,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask() {
      try {
        await this.$store.dispatch('deleteTask', this.task._id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
