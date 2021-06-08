import GmailAPI from '@/services/GmailAPI'

export default class GmailFilter {
  constructor(options) {
    this.user = {}
    this.messages = []
    this.isfetching = false
    Object.assign(this, options)
  }

  setUser(user) {
    this.user = user
  }

  getUser() {
    return this.user
  }

  isTokenInvalid() {
    return this.user.expiresAt < Date.now()
  }

  update(user) {
    this.setUser(user)
    this.fetch()
  }

  fetch() {
    const user = this.getUser()
    this.isfetching = true

    const parameters = {
      path: { userId: user.email },
      query: {
        access_token: user.accessToken,
        q: this.q,
        maxResults: this.maxResults
      }
    }

    const promise = new Promise((resolve, reject) => {
      if (this.isTokenInvalid()) {
        this.isfetching = false
        reject('google token invalido')
        return
      }

      GmailAPI.list(parameters)
        .then(response => {
          this.processfetch(response)
            .then(messages => { resolve(messages) })
            .catch(error => { reject(error) })
        })
        .catch(error => {
          console.log('GmailAPI.list', error.response.data.error.message)
          reject(error)
        })
    })
    return promise
  }

  processfetch(response) {
    // console.log('processfetch')
    this.messages = []

    const promise = new Promise((resolve, reject) => {
      const promises = []
      for (const m of response.data.messages) {
        promises.push(this.getMessage(m))
      }

      Promise.all(promises)
        .then(messages => { this.messages = messages; resolve(messages) })
        .catch(error => { reject(error) })
        .then(() => { this.isfetching = false })
    })
    return promise
  }

  getMessage(msg) {
    // console.log('getMessage', msg)
    const user = this.getUser()
    const opts = {
      path: { userId: user.email, id: msg.id },
      query: {
        access_token: user.accessToken,
        format: 'metadata'
      }
    }
    const promise = new Promise((resolve, reject) => {
      GmailAPI.get(opts)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log('GmailAPI.get', error.response.data.error.message)
          reject(error)
        })
    })
    return promise
  }
}
