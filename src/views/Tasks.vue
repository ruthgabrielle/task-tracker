<template>
    <div class="column is-three-quarter content">
        <Form @onSaveTask="saveTask" />
        <div class="list">
            <Task v-for="(task, index) in tasks" :key="index" :task="task" />
            <Box v-if="emptyList">
                No new tasks
            </Box>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from '../components/Form.vue';
import Task from '../components/Task.vue';
import Box from '../components/Box.vue';
import ITask from '../interfaces/ITask'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tasks",
    components: { Form, Task, Box },
    data() {
        return {
            tasks: [] as ITask[],
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

    }
});
</script>
