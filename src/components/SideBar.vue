<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo" />
        </h1>
    </header>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar'
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #1f4466;
    width: 100%;
    height: 100vh;
}

h1 {
    display: flex;
    justify-content: center;
}

img {
    height: 100px;
}


@media only screen and (max-width: 768px) {
    header {
        padding: 1rem;
        padding: 2.5rem;
        height: auto;
    }
}
</style>