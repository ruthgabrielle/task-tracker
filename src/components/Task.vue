<template>
    <Box>
        <div class="columns">
            <div class="column is-7"> {{ task?.description || 'No description'}} </div>
            <div class="column">
                <Stopwatch :time-seconds="task?.timeSeconds" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import ITask from '@/interfaces/ITask';
import { defineComponent, PropType } from 'vue';
import Stopwatch from './Stopwatch.vue';
import Box from './Box.vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Task',
    components: {
        Stopwatch,
        Box
    },
    props: {
        task: {
            type: Object as PropType<ITask>
        }
    }
}) 
</script>

