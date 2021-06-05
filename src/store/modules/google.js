import Vue from 'vue'
import gfilters from '@/data/gmail_filters'
import GmailFilter from '@/models/GmailFilter'
import { getUserDataDefault } from '@/utils/gapi'

const state = {
  user: {},
  gmail: {
    filters: []
  }
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user

    for (const f of state.gmail.filters) {
      f.setUser(user)
    }
  },
  SET_FILTERS: (state, filters) => {
    state.gmail.filters = filters
  }
}

const actions = {
  changeMessages({ commit }, messages) {
    commit('SET_MESSAGES', messages)
  },
  loadData(context) {
    context.dispatch('loadGoogleUser')
    context.dispatch('loadGmailFilters')
  },
  loadGoogleUser(context) {
    console.log('loadGoogleUser')
    const gapi = Vue.prototype.$gapi

    let user = gapi.getUserData()
    if (!user) user = getUserDataDefault()

    context.commit('SET_USER', user)
  },
  loadGmailFilters(context) {
    console.log('loadGmailFilters')
    const filters = []

    for (const f of gfilters) {
      const obj = new GmailFilter(f)
      obj.setUser(context.state.user)
      obj.fetch()

      filters.push(obj)
    }

    context.commit('SET_FILTERS', filters)
  }
}

const getters = {
  gmailCount: (state) => {
    const conteo = state.gmail.filters.reduce((suma, filter) => (suma += filter.messages.length), 0)
    return conteo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
