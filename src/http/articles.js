import * as http from './base'
/**
* 获取文章列表
* @param {object} params
*/
const getArticlesList = (params) => {
  return http.fetch('/articles', params)
}

/**
* 上传文章
* @param {object} params
*/
const createArticles = (params) => {
  return http.post('/articles', params)
}

/**
* 更新文章
* @param {object} params
*/
const updateArticles = (params) => {
  const { articleId } = params
  return http.put('/articles/' + articleId, params)
}

/**
* 删除文章
* @param {object} params
*/
const deleteArticles = (params) => {
  const { articleId } = params
  return http.del('/articles/' + articleId)
}
export { getArticlesList, createArticles, updateArticles, deleteArticles }
