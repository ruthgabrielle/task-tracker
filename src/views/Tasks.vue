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
import { computed, defineComponent } from 'vue';
import Form from '@/components/Form.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';
import ITask from '@/interfaces/ITask'
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, NEW_TASK } from '@/store/action-type';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tasks",
    components: { Form, Task, Box },
    computed: {
        emptyList(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.store.dispatch(NEW_TASK, task)
        },

    },
    setup() {
        const store = useStore()
        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        return {
            tasks: computed(() => store.state.tasks),
            store,
        }
    }
});
</script>
