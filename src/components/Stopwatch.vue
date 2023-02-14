
<template>
    <section>
        <strong>{{ elapsedTime }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Stopwatch',
    props: {
        timeSeconds: {
            type: Number,
            default: 0
        }
    },
    computed: {
        elapsedTime(): string {
            return new Date(this.timeSeconds * 1000).toISOString().substr(11, 8)
        }
    },
})

</script>