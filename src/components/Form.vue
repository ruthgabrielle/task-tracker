<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-level="Form to create new task">
                <input type="text" class="input" placeholder="Type your taks">
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>{{ elapsedTime }}</strong>
                    </section>
                    <button class="button" @click="start">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="stop">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Form',
    data() {
        return {
            timeSeconds: 0,
            stopwatch: 0
        }
    },
    computed: {
        elapsedTime(): string {
            return new Date(this.timeSeconds * 1000).toISOString().substr(11, 8)
        }
    },
    methods: {
        start() {
            this.stopwatch = setInterval(() => {
                this.timeSeconds += 1
            }, 1000)
        },
        stop() {
            clearInterval(this.stopwatch)
        }
    }
})
</script>