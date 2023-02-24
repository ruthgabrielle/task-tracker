<template>
    <div class="column is-three-quarter content">
        <Form @onSaveTask="saveTask" />
        <div class="list">
            <Box v-if="emptyList">
                No new tasks
            </Box>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Type for filter" v-model="filter" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <Modal :show-modal="taskSelected != null" v-if="taskSelected != null">
                <template v-slot:header>
                    <p class="modal-card-title">Edit Task</p>
                    <button @click="closeModal" class="delete" aria-label="close"></button>
                </template>
                <template v-slot:body>
                    <div class="field">
                        <label for="taskDescription" class="label">
                            Description
                        </label>
                        <input type="text" class="input" id="taskDescription" v-model="taskSelected.description" />
                    </div>
                </template>
                <template v-slot:footer>
                    <button class="button is-success" @click="alterTask">Save</button>
                    <button class="button" @click="closeModal">Cancel</button>
                </template>
            </Modal>
            <Task v-for="(task, index) in tasks" :key="index" :task="task" @onClickTask="selectTask" />

        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Form from '@/components/Form.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';
import ITask from '@/interfaces/ITask';
import Modal from '@/components/Modal.vue';
import useNotificador from '@/hooks/notificador'
import { useStore } from '@/store';
import { CHANGE_TASK, GET_PROJECTS, GET_TASKS, NEW_TASK } from '@/store/action-type';
import { NotificationType } from '@/interfaces/INotification';
import { task } from '@/store/modules/task';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tasks",
    components: { Form, Task, Box, Modal },
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

        const filter = ref("")

        watchEffect(() => {
            store.dispatch(GET_TASKS, filter.value)
        })

        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            notify,
            filter

        }
    }
});
</script>
