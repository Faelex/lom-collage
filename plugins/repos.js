import * as Factory from './../api/RepoFactory'
import * as Projects from './../api/repos/projectRepo'

export default (ctx, inject) => {
  const repos = {
    Projects,
    Factory
  }
  inject('repos', repos)
}
