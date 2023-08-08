<template>
  <div class="relative">
    <input
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '../../stores/task.jsx'

const store = useTaskStore()
const { handleAddTask } = store

const newTask = reactive({
  name: '',
  is_completed: false
})

//------------ chuyển qua dùng pinia
// const emit = defineEmits(['added'])

const addNewTask = async (event) => {
  // loại bỏ khoảng trắng nếu = "" -> k thực hiện
  if (event.target.value.trim()) {
    newTask.name = event.target.value
    event.target.value = ''

    //------------ chuyển qua dùng pinia
    // emit('added', newTask)

    await handleAddTask(newTask)
  }
}
</script>
