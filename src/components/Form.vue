
<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-level="Form to create new task">
                <input type="text" class="input" placeholder="Type your taks" v-model="description">
            </div>
            <div class="column">
                <Timer @on-stop-timer="endTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
            description: ''
        }
    },
    methods: {
        endTask(elapsedTime: number): void {
            this.$emit('onSaveTask', {
                timeSeconds: elapsedTime,
                description: this.description
            })
        }
    }
})
</script>

<style>
.form{
    background-color: var(--bg-primary);
    color: var(--primary-text)
}
</style>