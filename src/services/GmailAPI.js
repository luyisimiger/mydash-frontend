import axios from 'axios'

export default {
  list({ path, query }) {
    const URL = `https://gmail.googleapis.com/gmail/v1/users/${path.userId}/messages`
    return axios.get(URL, { params: query })
  },

  get({ path, query }) {
    const URL = `https://gmail.googleapis.com/gmail/v1/users/${path.userId}/messages/${path.id}`
    return axios.get(URL, { params: query })
  }
}
