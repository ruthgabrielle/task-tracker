<!--   TODO: Check bug time when use component-->

<template>
    <button class="button" :disabled=disabled @click="$emit('click')">
        <span class="icon">
            <i :class=classIcon></i>
        </span>
        <span>{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Button',
    props: {
        label: String,
        classIcon: String,
        disabled: Boolean,
    },
})
</script>