import { queryTRM } from '@/services/sFc'

const state = {
  loadingTRM: false,
  trm: 0
}

const mutations = {
  SET_TRM: (state, trm) => {
    state.trm = Number(trm)
  },
  SET_LOADING_TRM: (state, value) => {
    state.loadingTRM = value
  }
}

const actions = {
  loadData(context) {
    context.dispatch('getTRM', Date.now())
  },
  getTRM(context, fecha) {
    // console.log('getTRM')
    context.commit('SET_LOADING_TRM', true)

    return new Promise((resolve, reject) => {
      queryTRM(fecha)
        .then((response) => {
          const trm = response.data[0].valor
          context.commit('SET_TRM', trm)
          resolve(trm)
        })
        .catch(error => {
          console.log(error)
          context.commit('SET_TRM', 0)
          reject(error)
        })
        .then(() => context.commit('SET_LOADING_TRM', false))
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
