
<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-level="Form to create new task">
                <input type="text" class="input" placeholder="Type your taks" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Selecione o projeto</option>
                        <option :value="project.id" v-for="project in projects" :key="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Timer @on-stop-timer="endTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import Timer from './Timer.vue'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Form',
    emits: ['onSaveTask'],
    components: {
        Timer
    },
    setup(props, {emit}) {
        const store = useStore(key)
        const description = ref("")
        const projectId = ref("")
        const projects = computed(() => store.state.project.projects)

        const endTask = (elapsedTime: number): void => {
            emit('onSaveTask', {
                timeSeconds: elapsedTime,
                description: description.value,
                project: projects.value.find(proj => proj.id == projectId.value)
            })
            description.value = ""
        }
        return {
            description,
            projectId,
            projects,
            endTask
        }
    }
})
</script>

<style>
.form {
    background-color: var(--bg-primary);
    color: var(--primary-text)
}
</style>