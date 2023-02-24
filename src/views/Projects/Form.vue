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
import { useRouter } from 'vue-router';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Form',
    props: {
        id: {
            type: String
        }
    },

    setup(props) {
        const store = useStore()
        const router = useRouter()
        const { notify } = useNotificador()
        const projectName = ref("")
        if (props.id) {
            const project = store.state.project.projects.find(proj => proj.id == props.id)
            projectName.value = project?.name || ''
        }

        const success = () => {
            projectName.value = ""
            notify(NotificationType.SUCCESS, 'Success', 'The project was saved successfully')
            router.push('/projects')
        }
        const errorNotifcation = (err: any) => {
            projectName.value = ""
            notify(NotificationType.FAIL, 'Erro', err)
        }

        const save = () => {
            if (props.id) {
                store.dispatch(CHANGE_PROJ, {
                    id: props.id,
                    name: projectName.value
                })
                    .then(() => success())
                    .catch((error) => {
                        errorNotifcation(error)
                    })
            } else {
                store.dispatch(NEW_PROJECT, projectName.value)
                    .then(() => {
                        success()
                    }).catch((error) => {
                        errorNotifcation(error)
                    })
            }

        }
        return {
            projectName,
            save
        }

    }
})
</script>
