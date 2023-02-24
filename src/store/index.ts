import IProject from '@/interfaces/IProject'
import { INotification } from '@/interfaces/INotification'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { NOTIFY } from './mutation-type'

import ITask from '@/interfaces/ITask'
import { project, StateProject } from './modules/project'
import { StateTask, task } from './modules/task'
export interface State {
  notifications: INotification[]
  project: StateProject
  task: StateTask
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    project: {
      projects: [],
    },
    notifications: [],
    task: {
      tasks: [],
    },
  },
  mutations: {
    [NOTIFY](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification) => notification.id != newNotification.id
        )
      }, 3000)
    },
  },
  modules: {
    project,
    task,
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
