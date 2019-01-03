import * as TYPES from '../mutation.types'

const state = {
  revise: JSON.parse(localStorage.getItem('articleEditorRevise')) || null,
  add: JSON.parse(localStorage.getItem('articleEditorAdd')) || null
}

const actions = {}

const mutations = {
  [TYPES.ARTICLEREVISEUPDATE]: (state, data) => {
    state.revise = data
    localStorage.setItem('articleEditorRevise', JSON.stringify(data))
  },
  [TYPES.ARTICLEADDUPDATE]: (state, data) => {
    state.add = data
    localStorage.setItem('articleEditorAdd', JSON.stringify(data))
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
