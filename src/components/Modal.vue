<template>
    <div id="modal" class="modal" :class="{ 'is-active': showModal }" v-if="showModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header" />
            </header>
            <section class="modal-card-body">
                <slot name="body" />
            </section>
            <footer class="modal-card-foot">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Modal",
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
    },
});
</script>