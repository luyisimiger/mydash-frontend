import axios from 'axios'

export default {
  getPrice(symbol) {
    const URL = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    return axios.get(URL)
  },

  getSolana() {
    return this.getPrice('SOLUSDT')
  },

  getCardano() {
    return this.getPrice('ADAUSDT')
  }
}
