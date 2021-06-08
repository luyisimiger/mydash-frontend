import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import google from './modules/google'
import sfc from './modules/sfc'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    google,
    sfc
  },
  actions,
  getters
})

export default store
