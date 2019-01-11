import * as http from './base'
/**
* 获取标签
* @param {object} params
*/
const getTagsList = (params) => {
  return http.fetch('/tags', params)
}

/**
* 获取所有标签
* @param {object} params
*/
const getTagsAll = (params) => {
  return http.fetch('/tags/show', params)
}

/**
* 上传标签
* @param {object} params
*/
const createTags = (params) => {
  return http.post('/tags', params)
}

/**
* 更新标签
* @param {object} params
*/
const updateTags = (params) => {
  const { tagId } = params
  return http.put('/tags/' + tagId, params)
}

/**
* 删除标签
* @param {Number} id
*/
const deleteTags = (id) => {
  return http.del('/tags/' + id)
}

export { getTagsList, getTagsAll, createTags, updateTags, deleteTags }
