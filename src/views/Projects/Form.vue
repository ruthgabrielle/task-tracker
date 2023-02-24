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
import { defineComponent, ref } from 'vue';
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error(err: any) {
            this.projectName = ""
            this.notify(NotificationType.FAIL, 'Erro', err)
        }
    },
    setup(props) {
        const store = useStore()
        const { notify } = useNotificador()
        const projectName = ref("")
        if (props.id) {
            const project = store.state.project.projects.find(proj => proj.id == props.id)
            projectName.value = project?.name || ''
        }

        return {
            store,
            notify,
            projectName
        }

    }
})
</script>
