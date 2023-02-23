import IProject from '@/interfaces/IProject'
import { INotification } from '@/interfaces/INotification'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import {
  ADD_PROJECT,
  DEFINE_PROJECTS,
  DELETE_PROJECT,
  EDIT_PROJECT,
  NOTIFY,
} from './mutation-type'
import {
  CHANGE_PROJ,
  GET_PROJECTS,
  NEW_PROJECT,
  REMOVE_PROJECT,
} from './action-type'
import http from '@/http'
interface State {
  projects: IProject[]
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject
      state.projects.push(project)
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id)
      state.projects[index] = project
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((proj) => proj.id != id)
    },
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects
    },
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
  actions: {
    [GET_PROJECTS]({ commit }) {
      http
        .get('/projects')
        .then((response) => commit(DEFINE_PROJECTS, response.data))
    },
    [NEW_PROJECT](context, projectName: string) {
      return http.post('/projects', {
        name: projectName,
      })
    },
    [CHANGE_PROJ](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project)
    },
    [REMOVE_PROJECT]({ commit }, id: string) {
      return http
        .delete(`/projects/${id}`)
        .then(() => commit(DELETE_PROJECT, id))
    },
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
