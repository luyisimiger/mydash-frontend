import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import google from './modules/google'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    google
  },
  actions,
  getters
})

export default store
