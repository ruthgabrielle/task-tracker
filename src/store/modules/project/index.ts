import IProject from '@/interfaces/IProject'
import { Module } from 'vuex'
import { State } from '@/store'
import {
  ADD_PROJECT,
  DEFINE_PROJECTS,
  DELETE_PROJECT,
  EDIT_PROJECT,
} from '@/store/mutation-type'
import {
  CHANGE_PROJ,
  GET_PROJECTS,
  NEW_PROJECT,
  REMOVE_PROJECT,
} from '@/store/action-type'
import http from '@/http'

export interface StateProject {
  projects: IProject[]
}

export const project: Module<StateProject, State> = {
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
}
