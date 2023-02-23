<template>
    <section>
        <router-link to="/projects/new" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>New Project</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td><router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="remove(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { GET_PROJECTS, REMOVE_PROJECT } from '@/store/action-type';
import useNotificador from '@/hooks/notificador'
import { NotificationType } from '@/interfaces/INotification';

export default defineComponent({

    // eslint-disable-next-line vue/multi-word-component-names
    name: 'List',
    methods: {
        remove(id: string) {
            this.store.dispatch(REMOVE_PROJECT, id).then(() => this.notify(NotificationType.SUCCESS, 'Success', 'The project was successfully deleted')
            )
        }
    },
    setup() {
        const store = useStore()
        const { notify } = useNotificador()
        store.dispatch(GET_PROJECTS)

        return {
            projects: computed(() => store.state.projects),
            store,
            notify
        }
    }
})
</script>
