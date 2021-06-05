<template>
  <div>
    <h2>Inbox - <el-button type="text" @click="$router.go(-1)">hide</el-button></h2>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="msg in messages" :key="msg.id" :name="msg.id">
        <template slot="title">
          <b>{{ getHeader(msg, "Date") | formatDate('MMM DD') }}</b> ..... <span>{{ getHeader(msg, "Subject") }}</span>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>

import { getHeader } from '@/utils/google/gmail'

export default {

  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeNames: ['1']
    }
  },

  methods: {
    getHeader
  }
}
</script>
