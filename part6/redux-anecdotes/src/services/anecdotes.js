import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNewAnecdote = async (content) => {
  const obj = {
    content: content,
    id: getId(),
    votes: 0
  }

  const response = await axios.post(baseUrl, obj)
  return response.data
}


const updateVote = async (id) => {
  const obj = await axios.get(`${baseUrl}/${id}`)
  const newObj = {...obj.data, votes: obj.data.votes + 1}
  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj)
  return response.data
}

// eslint-disable-next-line
export default {
  getAllAnecdotes,
  createNewAnecdote,
  updateVote
} 