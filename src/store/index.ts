import IProject from '@/interfaces/IProject'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
interface State {
  projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
  },
  mutations: {
    ADD_PROJECT(state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject
      state.projects.push(project)
    },
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
