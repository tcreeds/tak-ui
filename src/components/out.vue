<script>
import axios from 'axios'
import { EventBus } from '@/components/eventbus.js'

const LOGIN_URL = '/users/login'
const SIGNUP_URL = '/users/newuser'

export default {

    getUrl: function(path){
        let isLocal = localStorage.getItem('isLocal')
        if (isLocal && false)
            return 'http://localhost:8080' + path
        return 'https://7eog8bdfu5.execute-api.us-east-1.amazonaws.com/dev/' + path
    },

    login(creds) {
        return this.post(LOGIN_URL, creds)
          .then((response) =>{
              console.log(response)
              localStorage.setItem('user', creds.username)
              this.token = response.headers["authorization"]
              if (this.token)
                localStorage.setItem('token', this.token)
              EventBus.$emit('login-change')
          })
    },

    logout() {
        this.token = undefined;
        localStorage.removeItem('token')
        EventBus.$emit('login-change')
    },

    checkAuth() {
      var jwt = localStorage.getItem('token')
      return jwt ? true : false
    },

    getUser() {
        return localStorage.getItem('user')
    },

    getToken() {
        if (!this.token)
            this.token = localStorage.getItem('token')
        return this.token
    },

    loadData: function(){
        return this.get('/tak-get')
        //return JSON.parse(localStorage.getItem('tasks'))
    },
    saveData: function(tasks){
        return this.post('/tak-update', tasks)
        //localStorage.setItem('tasks', JSON.stringify(tasks))
    },

    get: function(path, data){
        return axios.get(this.getUrl(path), {
            'headers': { 'Authorization': this.getToken() }
        })
    },
    post: function(path, data){
        return axios.post(this.getUrl(path), data, {
            'headers': { 'Authorization': this.getToken() }
        })
    }
}
</script>
