export const actions = {
  async nuxtClientInit({ dispatch }) {
    await dispatch('api/load')
  }
}
