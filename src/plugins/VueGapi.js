import Vue from 'vue'
import VueGapi from 'vue-gapi'

Vue.use(VueGapi, {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: ['https://gmail.googleapis.com/$discovery/rest?version=v1'],
  scope: 'https://www.googleapis.com/auth/gmail.readonly'
})
