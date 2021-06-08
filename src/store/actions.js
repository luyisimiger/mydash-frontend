const actions = {
  loadData(context) {
    context.dispatch('google/loadData')
    context.dispatch('sfc/loadData')
  }
}

export default actions
