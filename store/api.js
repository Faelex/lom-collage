export const state = {
  projects: []
}

export const mutations = {
  add(state, res) {
    if (res && res.length) {
      state.projects.push(...res)
      console.log('Projects  filled ...')
    }
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  }
}

export const actions = {
  async load({ commit }) {
    await this.$repos.Projects.default.get().then((res) => {
      commit('add', res.data.data)
    })
  }
}
