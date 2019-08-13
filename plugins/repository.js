import createRepository from './../api/repository'
export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repos = {
    intro: repositoryWithAxios('items/intro'),
    pages: repositoryWithAxios('items/pages'),
    articles: repositoryWithAxios('items/articles'),
    menu: repositoryWithAxios('items/menu_builder'),
    ticker: repositoryWithAxios('items/news_ticker'),
    news: repositoryWithAxios('items/news'),
    projects: repositoryWithAxios('items/projects'),
    publication: repositoryWithAxios('items/publication'),
    blocks: repositoryWithAxios('items/blocks')
  }
  inject('repos', repos)
}
