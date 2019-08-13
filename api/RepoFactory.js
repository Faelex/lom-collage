import ProjectRepo from './repos/projectRepo'
import GitHubRepo from './repos/gitHubRepo'

const repositories = {
  projects: ProjectRepo,
  gitHub: GitHubRepo
  // other repositories ...
}

export const RepoFactory = {
  get: (name) => repositories[name]
}
