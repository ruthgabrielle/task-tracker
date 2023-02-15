<template>
    <header>
        <div class="has-text-centered">
            <h1>
                <img src="../assets/logo.png" alt="Logo" />
            </h1>
            <button class="button" @click="changeTheme">
                {{ buttonText }}
            </button>
            <nav class="panel mt-5">
                <ul>
                    <li>
                        <router-link to="/" class="link">
                            <i class="fas fa-tasks"> </i>
                            tasks
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/projects" class="link">
                            <i class="fas fa-project-diagram"> </i>
                            projects
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar',
    emits: ['onChangeTheme'],
    data() {
        return {
            darkModeActive: false
        }
    },
    computed: {
        buttonText() {
            if (this.darkModeActive) {
                return 'Dark Mode'
            }
            return 'Light Mode'
        }
    },
    methods: {
        changeTheme() {
            this.darkModeActive = !this.darkModeActive
            this.$emit('onChangeTheme',
                this.darkModeActive
            )
        }
    }

})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #1f4466;
    width: 100%;
    height: 100vh;
    text-align: center;
}

h1 {
    display: flex;
    justify-content: center;
}

img {
    height: 100px;
}

.panel li {
    margin: 8px 0;
}

.link {
    color: #fff;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 1rem;
        padding: 2.5rem;
        height: auto;
    }

    .panel li {
        margin: 8px 0;
    }

    .link {
        color: #fff;
    }

    .link:hover {
        color: #FAF0CA;
    }

    .link.router-link-active {
        color: #FAF0CA;
    }
}
</style>