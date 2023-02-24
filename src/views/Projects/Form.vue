<template>
    <section>
        <h3 class="title">New Project</h3>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Project Name</label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit">Save</button>
            </div>
        </form>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import useNotificador from '@/hooks/notificador'

import { NotificationType } from '@/interfaces/INotification';
import { CHANGE_PROJ, NEW_PROJECT } from '@/store/action-type';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Form',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.project.projects.find(proj => proj.id == this.id)
            this.projectName = project?.name || ''
        }
    },
    data() {
        return {
            projectName: "",
        };
    },
    methods: {
        save() {
            if (this.id) {
                this.store.dispatch(CHANGE_PROJ, {
                    id: this.id,
                    name: this.projectName
                })
                    .then(() => this.success())
                    .catch((error) => {
                        this.error(error)
                    })
            } else {
                this.store.dispatch(NEW_PROJECT, this.projectName)
                    .then(() => {
                        this.success()
                    }).catch((error) => {
                        this.error(error)
                    })
            }

        },
        success() {
            this.projectName = ""
            this.notify(NotificationType.SUCCESS, 'Success', 'The project was saved successfully')
            this.$router.push('/projects')
        },
        error(err: any) {
            this.projectName = ""
            this.notify(NotificationType.FAIL, 'Erro', err)
        }
    },
    setup() {
        const store = useStore()
        const { notify } = useNotificador()
        return {
            store,
            notify
        }

    }
})
</script>
