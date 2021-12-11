<template>
  <div class="article">
    <!-- 数据未返回时，显示这个正在加载的gif -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading2.gif" alt>
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <li>•    posted at    {{post.update_time}}</li>
          <li>•    author : {{post.nickname}}</li>
          <button v-if="this.bookmarked" v-on:click="removeBookmark">Remove from bookmarks</button>
          <button v-else v-on:click="addBookmark">Add to bookmarks</button>
        </ul>
        <div class="markdown-text" v-html="post.html"></div>
      </div>

      <div id="reply">
        <comment-list :comment_array="post.comments" :post_id="post.post_id" @refresh="updateComments"></comment-list>
      </div>

    </div>
  </div>
</template>

<script>
import {marked} from 'marked'
import CommentList from "./CommentList";
export default {
  name: "Article",
  components: {CommentList},
  data() {
    return {
      bookmarked: false,
      isLoading: false,
      post: {} //代表当前文章页的所有属性
    };
  },
  methods: {
    getPostData: function() {
      this.$http
        .get("https://d2tvlmotz0dchv.cloudfront.net/api/postinfo/" + this.$route.params.post_id,
        {
          headers:{
            id_token: this.$root.id_token
          }
        }
        ) // 字符串模板形式 `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
        .then(res => {
          this.isLoading = false;
          this.post = res.data.data[0];
          if (this.post['comments'] === undefined) {
            this.post['comments'] = []
          }
          console.log(this.post.comments)
          this.post.html = marked(this.post.content)
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateComments: function() {
      this.$http
        .get("https://d2tvlmotz0dchv.cloudfront.net/api/postinfo/" + this.post.post_id,
          {
            headers:{
              id_token: this.$root.id_token
            }
          }
        ) // 字符串模板形式 `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
        .then(res => {
          this.isLoading = false;
          let update = res.data.data[0];
          this.post.comments = update['comments']
          //this.$set(this.post,'comments',update['comments'])
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    this.getPostData();
    this.getBookmarkInfo();
  }
};
</script>


<style scoped>
@import url("../assets/markdown-github.css"); /* 引入外部css需去掉scoped */
.article {
  background-color: #e1e1e1;
  position: relative;
  width: 72%;
  margin-left: 5%;
  margin-top: 15px;
  margin-bottom: 100px;
  max-width: 697px;
}
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}
#reply .ups{
  display: flex;
  justify-content:flex-end;
  margin-right: 15px;

}
.replyup p{
  max-width: 630px;
}
#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
.loading img{
    height: 30px;
    width: 30px;
    vertical-align: middle;
    position: absolute;
    left: 50%;
    right: 50%;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
  margin-top: 10px;
}

.markdown-text img {
  width: 92% !important;
  margin-right: -8%;
}
.markdown-text img {
  display: block;
}

</style>
