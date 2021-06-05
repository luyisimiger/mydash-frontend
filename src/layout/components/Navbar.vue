<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-menu class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item v-if="!isSignedIn" :route="{ name: 'login' }">
          <el-link @click="onGoogleLogin">Login</el-link>
        </el-menu-item>
        <el-submenu v-else index="null">
          <template slot="title">
            <img :src="user.imageUrl" :title="user.fullName" class="user-avatar" height="60%">
            &nbsp;
            <b>{{ user.fullName }}</b>
          </template>
          <el-menu-item :route="{ name: 'Dashboard' }" index="home">
            Home
          </el-menu-item>
          <el-menu-item index="logout" @click.native="logout">
            Logout
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { getUserDataDefault } from '@/utils/gapi'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState('google', ['user']),
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    userName() {
      return this.user.firstName
    },

    isSignedIn() {
      return (this.user.expiresAt > Date.now())
    }
  },
  methods: {
    ...mapMutations('google', {
      setUser: 'SET_USER'
    }),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.google_logout()
    },
    onGoogleLogin() {
      this.google_login()
    },
    google_login() {
      const that = this
      this.$gapi.login()
        .then(({ currentUser, hasGrantedScopes }) => {
          const user = that.$gapi.getUserData()
          that.setUser(user)
        })
    },
    google_logout() {
      const that = this
      this.$gapi.logout().then((data) => {
        that.setUser(getUserDataDefault())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
