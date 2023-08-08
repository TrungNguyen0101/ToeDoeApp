<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        :class="compoletedTasks"
        :checked="item.is_completed"
        @change="markCompleted"
      />
      <div
        class="ms-2 flex-grow-1"
        :class="compoletedTasks"
        title="Double click the text to edit or remove"
        @dblclick="isEdit = true"
      >
        <div class="relative" v-if="isEdit">
          <!--v-model : liên kết input với editingTask   -->
          <input
            class="editable-task"
            type="text"
            @keyup.esc="undo"
            v-focus
            @keyup.enter="updateTask"
            v-model="editingTask"
          />
        </div>
        <span v-else>{{ item.name }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
    </div>
    <TaskAction @edit="($event) => (isEdit = true)" v-show="!isEdit" @remove="removeTask" />
  </li>
</template>

<script setup>
// import { computed, watchEffect } from 'vue'
import { computed, ref } from 'vue'
import TaskAction from '../tasks/TaskAction.vue'

// Định nghĩa props
const props = defineProps({
  item: Object
})

const emit = defineEmits(['update', 'completed', 'remove'])

// Sử dụng giá trị props với tính reactivity
// watchEffect(() => {
//   console.log('Item:', props.item)
// })

const isEdit = ref(false)
const editingTask = ref(props.item.name)

// computed : tính toán lại khi dữ liệu thay đổi
const compoletedTasks = computed(() => (props.item.is_completed ? 'completed' : ''))

const vFocus = {
  mounted: (el) => el.focus()
}

const undo = () => {
  isEdit.value = false
  editingTask.value = props.item.name
}

const updateTask = (event) => {
  const result = { ...props.item, name: event.target.value }
  isEdit.value = false
  emit('update', result)
}

const markCompleted = () => {
  const result = { ...props.item, is_completed: !props.item.is_completed }
  emit('completed', result)
}

const removeTask = () => {
  if (confirm('Are you sure')) {
    emit('remove', props.item)
  }
}
</script>
