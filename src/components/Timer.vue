<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Stopwatch :timeSeconds="timeSeconds" />
        <button class="button" @click="start" :disabled="timeRunning">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="stop" :disabled="!timeRunning">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue'
import Stopwatch from './Stopwatch.vue'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Timer',
    emits: ['onStopTimer'],
    components: {
        Stopwatch,
    },
    data() {
        return {
            timeSeconds: 0,
            stopwatch: 0,
            timeRunning: false
        }
    },
    methods: {
        start() {
            this.timeRunning = true
            this.stopwatch = setInterval(() => {
                this.timeSeconds += 1
            }, 1000)
        },
        stop() {
            this.timeRunning = false
            clearInterval(this.stopwatch)
            this.$emit('onStopTimer', this.timeSeconds)
            this.timeSeconds = 0
        }
    }
})

</script>