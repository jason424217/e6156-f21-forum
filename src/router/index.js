import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
import Auth from '../components/Auth'
import Post from "../components/Post";

Vue.use(Router)
Vue.use(GSignInButton)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:Auth
      }
    },
    {
      name:'posts',
      path:'/posts',
      components:{
        main:PostList
      }
    },
    {
      name:'new_post',
      path:'/new_post',
      components:{
        main:Post,
      }
    },
    {
      name:'post_content',
      path:'/posts/:post_id',
      components:{
        main:Article,
      }
    },
    {
      name:'user_info',
      path:'/userinfo/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
