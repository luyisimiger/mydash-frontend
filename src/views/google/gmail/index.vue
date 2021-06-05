<template>
  <div class="app-container">
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="14">
        <h2>Filtros</h2>
        <el-row :gutter="10">
          <el-col v-for="(f, index) in filters" :key="index" :lg="8">
            <el-card shadow="hover">
              <div slot="header">
                <img :src="f.urlImage" width="100%">
              </div>
              <el-button type="text" icon="el-icon-refresh" :loading="f.isfetching" @click="handleFilterFetch(f)">
                <count-to :start-val="0" :end-val="f.messages.length" :duration="3000" />
                <span>menssages</span>
              </el-button>
              <el-button v-if="f.messages.length" type="text" @click="handleFilterClick(f)">show</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="10">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('google')

export default {
  components: {
    CountTo
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      filters: state => state.gmail.filters
    })
  },

  methods: {
    ...mapActions(['changeMessages']),
    handleFilterFetch(f) {
      f.fetch()
        .catch(() => { this.$message('No se pudieron consultar los mensajes') })
    },
    handleFilterClick(f) {
      this.$router.push({ name: 'gmail-inbox', params: { name: f.name, messages: f.messages }})
    }
  }
}
</script>
