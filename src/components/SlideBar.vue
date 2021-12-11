<template>
  <div class="autherinfo">
      <div class="autherSummary">
        <div class="topbar">Actions</div>
        <button v-if="this.bookmarked" v-on:click="removeBookmark">Remove from bookmarks</button>
        <button v-else v-on:click="addBookmark">Add to bookmarks</button>
      </div>    
      </div>
</template>

<script>
export default {
  name: 'SlideBar',
  data () {
    return {
       bookmarked: false
    }
  },
  methods: {
    getBookmarkInfo: function() {
      this.$http
        .get("https://d2tvlmotz0dchv.cloudfront.net/api/bookmarks", {
          params:{
            post_id: this.$route.params.post_id
          },
          headers:{
            id_token: this.$root.id_token
          },
        })
        .then(res => {
          console.log(res)
          if (res.data.length == 0) {
            this.bookmarked = false
          }
          else {
            this.bookmarked = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addBookmark: function() {
      this.$http
        .post("https://d2tvlmotz0dchv.cloudfront.net/api/bookmarks",
          { post_id: this.$route.params.post_id}, 
          {
            headers:{
              id_token: this.$root.id_token
            },
        })
        .then(res => {
          this.bookmarked = true
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeBookmark: function() {
      this.$http
        .delete("https://d2tvlmotz0dchv.cloudfront.net/api/bookmarks", {
          params:{
            post_id: this.$route.params.post_id
          },
          headers:{
            id_token: this.$root.id_token
          },
        })
        .then(res => {
          this.bookmarked = false
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
 
  beforeMount: function() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getBookmarkInfo();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .autherSummary, .recent_replies, .recent_topics {
    background-color: #fff;
  }
  .autherinfo {
    width: 220px;
    position: relative;
    top: -700px;
    right: -850px;
  }
  .authorName{
    display: inline-block;
    position: absolute;
    top: 60px;
    left: 70px;
    color: #778087;
    font-size: 15px
  }
  li{
    padding: 3px 0 ;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 40px;
    font-size: 12px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  
</style>
