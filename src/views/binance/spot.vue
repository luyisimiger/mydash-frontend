<template>
  <div>
    <p>SOLANA</p>
    <p>{{ solana }}</p>
    <br>
    <p>CARDANO</p>
    <p>{{ cardano }}</p>
    <button @click="actualizar">Actualizar</button>
  </div>
</template>

<script>
import Binance from '@/services/Binance'

export default {
  data() {
    return {
      solana: 0,
      cardano: 0
    }
  },

  methods: {
    created() {
      this.actualizar()
    },
    actualizar() {
      var that = this

      Binance.getSolana()
        .then(response => {
          that.solana = response.data.price
          console.log(response)
        })

      Binance.getCardano()
        .then(response => {
          that.cardano = response.data.price
          console.log(response)
        })
    }
  }
}
</script>

<style>
</style>
