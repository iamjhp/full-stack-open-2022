import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newOjbect => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newOjbect, config)
  return response.data
}

const likeBlog = async (blogId, blogObj) => {
  const updateUrl = baseUrl + `/${blogId}`
  const response = await axios.put(updateUrl, blogObj)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, create, likeBlog, deleteBlog, setToken }