import IProject from '@/interfaces/IProject'
import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
interface State {
  projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [
      {
        id: new Date().toISOString(),
        name: 'TypeScript',
      },
      {
        id: new Date().toISOString(),
        name: 'Vue',
      },
      {
        id: new Date().toISOString(),
        name: 'Vuex',
      },
    ],
  },
})
