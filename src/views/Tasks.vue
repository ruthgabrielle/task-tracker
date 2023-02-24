<template>
    <div class="column is-three-quarter content">
        <Form @onSaveTask="saveTask" />
        <div class="list">
            <Box v-if="emptyList">
                No new tasks
            </Box>
            <Task v-for="(task, index) in tasks" :key="index" :task="task" @onClickTask="selectTask" />
            <div id="modal" class="modal" :class="{ 'is-active': taskSelected }" v-if="taskSelected">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit task</p>
                        <button class="delete" aria-label="close" @click="closeModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label for="taskDescription" class="label">
                                Description
                            </label>
                            <input type="text" class="input" id="taskDescription" v-model="taskSelected.description" />
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="alterTask">Save</button>
                        <button class="button" @click="closeModal">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Form from '@/components/Form.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';
import ITask from '@/interfaces/ITask'
import useNotificador from '@/hooks/notificador'
import { useStore } from '@/store';
import { CHANGE_TASK, GET_PROJECTS, GET_TASKS, NEW_TASK } from '@/store/action-type';
import { NotificationType } from '@/interfaces/INotification';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tasks",
    components: { Form, Task, Box },
    data() {
        return {
            taskSelected: null as ITask | null
        }
    },
    computed: {
        emptyList(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.store.dispatch(NEW_TASK, task)
        },
        selectTask(task: ITask) {
            this.taskSelected = task
        },
        closeModal() {
            this.taskSelected = null;
        },
        alterTask() {
            this.store.dispatch(CHANGE_TASK, this.taskSelected)
                .then(() => { this.closeModal(), this.notify(NotificationType.SUCCESS, 'Success', 'The project was successfully edited') })
        }

    },
    setup() {
        const store = useStore()
        const { notify } = useNotificador()
        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            notify

        }
    }
});
</script>
