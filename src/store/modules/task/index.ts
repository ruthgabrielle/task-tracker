import ITask from '@/interfaces/ITask'
import { Module } from 'vuex'
import { State } from '@/store'
import { ADD_TASK, ALTER_TASK, DEFINE_TASKS } from '@/store/mutation-type'
import http from '@/http'
import { GET_TASKS, NEW_TASK, CHANGE_TASK } from '@/store/action-type'
export interface StateTask {
  tasks: ITask[]
}
export const task: Module<StateTask, State> = {
  mutations: {
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task)
    },
    [ALTER_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t) => t.id == task.id)
      state.tasks[index] = task
    },
  },
  actions: {
    [GET_TASKS]({ commit }) {
      http.get('/tasks').then((response) => commit(DEFINE_TASKS, response.data))
    },
    [NEW_TASK]({ commit }, task: ITask) {
      return http
        .post('/tasks', task)
        .then((response) => commit(ADD_TASK, response.data))
    },
    [CHANGE_TASK]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(ALTER_TASK, task))
    },
  },
}
