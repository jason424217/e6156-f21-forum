<template>
  <div class="vertical-center">
<div class="inner-block">
<div class="Auth">
  <b class="welcome-text">Welcome to Himalayas. Please login first.</b>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
  </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '118412287260-mhe3b17k080n7dfdlctsgjkshqleit84.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      this.$root.email = profile.jv
      this.$root.logged_in = true
      this.$root.id_token = googleUser.getAuthResponse().id_token
      this.$router.push('/posts')
      console.log(this.$root.id_token)
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  },
  created:function(){  
    if(this.$root.logged_in) {
      console.log("dskljaslkdg")
      this.$router.push('/posts')
    }
  }
}
</script>

<style scoped>
.g-signin-button {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  background: #3cbada;
}
.g-signin-button:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;

  border-right: #3290e7 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}

.g-signin-button:hover,
.g-signin-button:focus {
  cursor: pointer;
  background: #1c4a9e;
}
</style>