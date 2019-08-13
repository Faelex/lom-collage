import Repository from './../Repo'

const resource = 'items/projects'
export default {
  get(params = null) {
    return Repository.get(`${resource}` + (params ? `?${params}` : ''))
  },

  getCover(id) {
    return Repository.get(`${resource}/${id}?fields=cover.data.thumbnails`)
  },

  getProject(id, params = null) {
    return Repository.get(`${resource}/${id}` + (params ? `?${params}` : ''))
  },

  createPost(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
