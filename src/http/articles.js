import * as http from './base'
/**
* 获取文章列表
* @param {object} params
*/
const getArticlesList = (params) => {
  return http.fetch('/articles', params)
}
export { getArticlesList }
