
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
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Timer from './Timer.vue'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Form',
    emits: ['onSaveTask'],
    components: {
        Timer
    },
    data() {
        return {
            description: '',
            projectId: ''
        }
    },
    methods: {
        endTask(elapsedTime: number): void {
            this.$emit('onSaveTask', {
                timeSeconds: elapsedTime,
                description: this.description,
                project: this.projects.find(proj => proj.id == this.projectId)
            })
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projects: computed(() => store.state.project.projects)
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