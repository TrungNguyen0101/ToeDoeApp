<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <!-- <NewTask @added="handleAddTask" /> -->
          <NewTask />
          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks" />

          <!-- Show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompleteBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="($event) => (showCompleteTask = !showCompleteTask)"
            >
              <span v-if="!showCompleteTask">Show completed</span>
              <span v-else-if="showCompleteTask">Hide completed</span>
            </button>
          </div>

          <!-- list of completed tasks -->
          <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompleteTask" />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/task.jsx'
import { storeToRefs } from 'pinia'
import Tasks from '../components/tasks/Tasks.vue'
import NewTask from '../components/tasks/NewTask.vue'

const store = useTaskStore()
const { completedTasks, uncompletedTasks } = storeToRefs(store)
const { fetchAllTasks } = store

//truy cập và update đối tượng trong store
//c1
// store.task.name = 'first task Update'
// store.task.is_completed = true
//c2
// store.$patch({
//   task: {
//     name: 'First task update use $patch',
//     is_completed: true
//   }
// })

onMounted(async () => {
  //------- Chuyển qua dùng Pinia
  // const { data } = await allTask()
  //  tasks.value = data.data

  await fetchAllTasks()
})

const showToggleCompleteBtn = computed(() => {
  return uncompletedTasks.value?.length > 0 && completedTasks.value?.length > 0
})
const completedTasksIsVisible = computed(
  () => uncompletedTasks.value?.length === 0 || completedTasks.value?.length > 0
)

const showCompleteTask = ref(false)

//------- Chuyển qua dùng Pinia
// const tasks = ref([])
// const uncompletedTasks = computed(() => {
//   return tasks.value.filter((item) => !item.is_completed)
// })
// const completedTasks = computed(() => {
//   return tasks.value.filter((item) => item.is_completed)
// })
// handleAddTask lắng nghe sk added của component con và payload
// const handleAddTask = async (newTask) => {
//     const { data: result } = await createTask(newTask)

//     tasks.value.unshift(result.data)
//   }
// const handleUpdateTask = async (task) => {
//   const { data: result } = await updateTask(task.id, {
//     name: task.name
//   })
//   const currentTask = tasks.value.find((item) => item.id == task.id)
//   currentTask.name = result.data.name
// }
// const handleUpdateCompleted = async (task) => {
//   const { data: result } = await completeTask(task.id, {
//     is_completed: task.is_completed
//   })
//   const currentTask = tasks.value.find((item) => item.id == task.id)
//   currentTask.is_completed = result.data.is_completed
// }
// const handleRemoveTask = async (task) => {
//   await removeTask(task.id)
//   const index = tasks.value.findIndex((item) => item.id === task.id)
//   //xóa 1 phần tử kể từ vị trí index
//   tasks.value.splice(index, 1)
// }
</script>
