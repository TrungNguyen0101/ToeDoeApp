import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { allTask, createTask, updateTask, completeTask, removeTask } from '../http/task-api'

//c1
// const tmp = {
//   state: () => ({
//     tasks:[],
//     task:{}
//   }),
//   getters: {
//     //c1
//     completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
//     //c2
//     uncompletedTasks() {
//       return this.tasks.filter((task) => !task.is_completed)
//     }
//     uncompletedCount() {
//       return this.uncompleted.length
//     }
//   },
//   actions: {
//     async fetchAllTasks() {
//       const { data } = await allTask()
//       this.tasks = data.data
//     }
//   }
// }

//c2
export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed))
  const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed))

  const fetchAllTasks = async () => {
    const { data } = await allTask()
    tasks.value = data.data
  }

  const handleAddTask = async (newTask) => {
    const { data: result } = await createTask(newTask)

    tasks.value.unshift(result.data)
  }

  const handleUpdateTask = async (task) => {
    const { data: result } = await updateTask(task.id, {
      name: task.name
    })
    const currentTask = tasks.value.find((item) => item.id == task.id)
    currentTask.name = result.data.name
  }

  const handleUpdateCompleted = async (task) => {
    const { data: result } = await completeTask(task.id, {
      is_completed: task.is_completed
    })
    const currentTask = tasks.value.find((item) => item.id == task.id)
    currentTask.is_completed = result.data.is_completed
  }

  const handleRemoveTask = async (task) => {
    await removeTask(task.id)
    const index = tasks.value.findIndex((item) => item.id === task.id)
    //xóa 1 phần tử kể từ vị trí index
    tasks.value.splice(index, 1)
  }
  return {
    tasks,
    uncompletedTasks,
    completedTasks,
    fetchAllTasks,
    handleAddTask,
    handleUpdateTask,
    handleUpdateCompleted,
    handleRemoveTask
  }
})
