<template>
    <section class="projects">
        <h1 class="title">Projects</h1>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Project Name</label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit">Save</button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import IProject from '@/interfaces/IProject';
import { defineComponent } from 'vue';

export default defineComponent({

    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Projects',
    data() {
        return {
            projectName: "",
            projects: [] as IProject[],
        };
    },
    methods: {
        save() {
            const projeto: IProject = {
                name: this.projectName,
                id: new Date().toISOString(),
            };
            this.projects.push(projeto);
            this.projectName = "";
        },
    },
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>