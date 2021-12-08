// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Notifications from 'vue-notification'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.prototype.$http = Axios
Vue.use(mavonEditor)
Vue.use(Notifications)

Vue.config.productionTip = false

//处理时间
Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var number = 0
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return 'Just Now'
  } else if (time / 1000 < 60) {
    number = parseInt((time / 1000))
    if (number > 1) {
      return number + ' seconds ago'
    }
    else {
      return number + ' second ago'
    }
  } else if ((time / 60000) < 60) {
    number = parseInt((time / 1000))
    if (number > 1) {
      return number + ' minutes ago'
    }
    else {
      return number + ' minute ago'
    }
  } else if ((time / 3600000) < 24) {
    number = parseInt(time / 3600000)
    if (number > 1) {
      return number + ' hours ago'
    }
    else {
      return number + ' hour ago'
    }
  } else if ((time / 86400000) < 31) {
    number = parseInt(time / 86400000)
    if (number > 1) {
      return number + ' days ago'
    }
    else {
      return number + ' day ago'
    }
  } else if ((time / 2592000000) < 12) {
    number = parseInt(time / 2592000000)
    if (number > 1) {
      return number + ' months ago'
    }
    else {
      return number + ' month ago'
    }
  } else {
    number = parseInt(time / 31536000000)
    if (number > 1) {
      return number + ' years ago'
    }
    else {
      return number + ' year ago'
    }
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  data: {
    logged_in: false,
    id_token: "",
    email: ""
  }
})


