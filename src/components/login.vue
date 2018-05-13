<template>
  <div class="login-container">
    <h2>Log In</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="password"
        v-model="credentials.password"
      >
    </div>
    <button class="login-btn" @click="submit">Log In</button>
  </div>
</template>

<script>
import Out from '@/components/out'
import { EventBus } from '@/components/eventbus'

export default {

  data: function() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  ready: function(){
      EventBus.$on('login-change', this.checkAuth)
  },

  methods: {

    submit: function () {

      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      Out.login(credentials)
      .then(() => {
          this.$router.replace(this.$route.query.redirect || '/')
      })
      .catch((response) => {
          console.log(response)
          alert('no')
      })
    },

    checkAuth: function(){
        this.loggedIn = Out.checkAuth()
        console.log("checking login auth")
    }
  }

}
</script>

<style>
    .login-container{
        font-size: 1.2em;
    }
    .form-control{
        text-align: center;
        font-size: 1em;
    }
    .login-btn{
        margin-top: 0.5em;
    }
</style>
