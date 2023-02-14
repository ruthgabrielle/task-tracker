<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive}">
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Form @onSaveTask="saveTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <Box v-if="emptyList">
          No new tasks
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import Form from './components/Form.vue';
import Task from './components/Task.vue';
import Box from './components/Box.vue';
import ITask from './interfaces/ITask'
export default defineComponent({
  name: "App",
  components: { SideBar, Form, Task, Box },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeActive: false
    }
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    },
    changeTheme(darkModeActive: boolean) {
      this.darkModeActive = darkModeActive
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
