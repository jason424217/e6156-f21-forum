<template>
<div class="vue-tempalte">
  <div id="app">
    <Header></Header>
    <div class="main">
    <router-view name="main"></router-view>
    <router-view name="slidebar"></router-view> 
    </div>
  </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
import Article from './components/Article'
import SlideBar from './components/SlideBar'
import Auth from './components/Auth'
export default {
  name: 'App',
  components:{
    Header,
    PostList,
    Article,
    SlideBar,
    Auth
  },
}
</script>