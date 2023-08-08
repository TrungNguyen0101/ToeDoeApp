<template>
  <div class="card mt-2" v-if="tasks.length && show">
    <ul class="list-group list-group-flush">
      <Task
        v-for="item in tasks"
        :item="item"
        :key="item.id"
        @update="handleUpdateTask"
        @completed="handleUpdateCompleted"
        @remove="handleRemoveTask"
      />
    </ul>
  </div>
</template>

<script setup>
import Task from './Task.vue'
import { useTaskStore } from '../../stores/task.jsx'

const store = useTaskStore()

const { handleUpdateTask, handleUpdateCompleted, handleRemoveTask } = store

defineProps({
  tasks: Array,
  show: {
    type: Boolean,
    default: true
  }
})
</script>
