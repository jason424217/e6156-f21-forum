<template>
  <div class="PostList">
    <!-- 数据未返回时，显示这个正在加载的gif -->
    <div class="loading" v-if="isLoading">
      <img  src="../assets/loading2.gif" alt="">
    </div>
    <router-link :to="'new_post'" tag="button">Create a new post!</router-link>
    <!-- 代表我们的主题帖子列表 -->
    <div class="posts">
      <ul>
        <li>
        <div class="toobar">
          <span @click="sortList()">Newest post</span>
          <span @click="sortList('last_comment_time')">Newest reply</span>
        </div>
      </li>
      <li v-for="post in posts" :key='post.num'>
        <!-- 头像 -->
        <p>{{post.nickname}}</p>
        <!-- 标题 -->
        <router-link :to="{
          name:'post_content',
          params:{
            post_id:post.post_id,
          }
          }">
          <span>
          {{post.title}}
        </span>
        </router-link>

        <!-- 最终回复时间 -->
        <span class="last_reply">{{post.last_comment_time | formatDate}}</span>
      </li>
    <li>

      <pagination :total-items="totalItems" :items-per-page="itemsPerPage" @handle="changePage"></pagination>
    </li>

    </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination.vue'
export default {
  name: 'PostList',
  data () {
    return {
      isLoading:false,
      posts:[],
      offset:0,
      sort_by:undefined,
      totalItems:0,
      itemsPerPage:1,
      helper:true
    }
  }
  ,watch:{
    helper:{
      handler:function(){
        this.$http.get("https://d2tvlmotz0dchv.cloudfront.net/api/posts", {
          headers:{
            id_token: this.$root.id_token
          }
        })
          .then((res)=>{
            this.totalItems = res.data.data.length
            console.log(this.totalItems)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      immediate:true
    }
  },
  components:{
    pagination
  },
  methods:{
    getPost:function(){
      let params = {
        offset: this.offset,
        limit: this.itemsPerPage
      }
      if (this.sort_by !== undefined) {
        params['orderby'] = this.sort_by
      }
      this.$http.get('https://d2tvlmotz0dchv.cloudfront.net/api/postinfo',{
      //this.$http.get('https://wt3zom2jk0.execute-api.us-east-2.amazonaws.com/dev/api/users/whoami',{
        params:{
          params
        },
        headers:{
          id_token: this.$root.id_token
        }
      })
      .then((res)=>{
        this.isLoading = false
        this.posts = res.data.data
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    changePage:function(value){
      this.offset = (value - 1) * this.itemsPerPage
      // this.isLoading = true
      this.getPost()
    },
    sortList:function(val){
      this.sort_by = val
      this.getPost()
    }
  },
  created:function(){
    if(!this.$root.logged_in) {
      this.$router.push('/')
    }
  },
  beforeMount:function(){
    this.isLoading = true //加载成功之前显示加载动画
    this.getPost()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0;
  padding:0;
}
 .PostList{
    width: 100%;
    padding-bottom: 100px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;

  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: rgba(255, 255, 255, 0.95);
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 75px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 18px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding: 200px;
    opacity: 0.7; 
  }
</style>
