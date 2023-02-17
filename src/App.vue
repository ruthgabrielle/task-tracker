<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notification />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Notification from './components/Notification.vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: "App",
  components: { SideBar, RouterView, Notification },
  data() {
    return {
      darkModeActive: false
    }
  },
  methods: {
    changeTheme(darkModeActive: boolean) {
      this.darkModeActive = darkModeActive
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
