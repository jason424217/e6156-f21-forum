<template>
  <div class="container">
    <div class="col-md-12 bootstrap snippets">
      <div class="panel">
        <div class="panel-body">
          <textarea v-model="new_comment.content" id="input-area" class="form-control" rows="2" placeholder="What are you thinking?"></textarea>
          <div class="mar-top clearfix">
            <button class="btn btn-sm btn-primary pull-right" @click="newComment"><i class="fa fa-pencil fa-fw"></i> Share</button>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body" v-if="comment_array.length === 0">
          No comment yet.
          Leave your comment NOW!!
        </div>

        <div class="panel-body" v-else>
          <div class="media-block"
               v-for="(comment, idx) in comment_array"
               :key="idx"
          >
            <div class="media-body">
              <div class="mar-btm">
                <router-link :to="{
                  name: 'user_info',
                  params: {
                    name: comment.user_id
                  }
                }" class="btn-link text-semibold media-heading box-inline">{{comment.nickname}}</router-link>
                <p class="text-muted text-sm">{{comment.update_time | formatDate}}</p>
              </div>
              <p>
                {{comment.content}}
              </p>
              <div class="pad-ver">
                <button class="btn-primary" @click="changeShow(idx, true)">Reply</button>
                <div v-show="show_array[idx] === true">
                  <textarea v-model="new_reply.content" :id="'input-area-'+idx" class="form-control" rows="2" placeholder="What are you thinking?"></textarea>
                  <button class="btn-info" @click="newReply(idx)">Submit the Reply</button>
                  <button class="btn-dark" @click="cancel(idx)">Cancel</button>
                </div>
              </div>
              <hr>

              <div>
                <div class="media-block"
                     v-for="(reply, index) in comment.responses"
                     :key="index"
                >
                  <a class="media-left"><p class="img-circle img-sm" /></a>
                  <div class="media-body">
                    <div class="mar-btm">
                      <router-link :to="{
                        name: 'user_info',
                        params: {
                          name: reply.user_id
                        }
                      }" class="btn-link text-semibold media-heading box-inline">{{reply.nickname}}</router-link>
                      <p class="text-muted text-sm">{{reply.update_time | formatDate}}</p>
                    </div>
                    <p>
                      {{reply.content}}
                    </p>
                    <hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "CommentList",
  props: {
    comment_array: Array,
    post_id: String
  },
  data() {
    return {
      new_comment: {
        content:""
      },
      show_array: new Array(this.comment_array.length).fill(false),
      new_reply: {
        content:""
      }
    }
  },
  methods: {
    newComment:function() {
      this.$http.post("https://d2tvlmotz0dchv.cloudfront.net/api/posts/" + this.post_id + '/comments', this.new_comment,  {
        headers:{
          id_token: this.$root.id_token
        }
      })
      .then(res => {
        console.log(res)
        if (res.status < 300) {
          this.$notify({
            title: 'Notification',
            text: 'comment successfully created!',
            type: 'success'
          })
          this.$emit('refresh')
          $("#input-area").val('')
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    newReply:function(idx) {
      this.$http.post("https://d2tvlmotz0dchv.cloudfront.net/api/posts/" + this.post_id + '/comments/' + idx, this.new_reply,  {
        headers:{
          id_token: this.$root.id_token
        }
      })
      .then(res => {
        console.log(res)
        if (res.status < 300) {
          this.$notify({
            title: 'Notification',
            text: 'reply successfully created!',
            type: 'success'
          })

          this.$emit('refresh')
          this.cancel(idx)
        }
      })
      .catch(err => {
        this.$notify({
          title: 'Notification',
          text: 'reply failed!',
          type: 'error'
        })
        console.log(err)
      })
    },
    cancel:function(idx) {
      $(`#input-area-${idx}`).val('')
      this.$set(this.show_array, idx, false)
    },
    changeShow:function(idx) {
      this.$set(this.show_array, idx, true)
    }
  }
}
</script>

<style scoped>
body{
  margin-top:20px;
  background:#ebeef0;
}

.img-sm {
  width: 46px;
  height: 46px;
}

.panel {
  box-shadow: 0 2px 0 rgba(0,0,0,0.075);
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}

.panel .panel-footer, .panel>:last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.panel .panel-heading, .panel>:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.panel-body {
  padding: 25px 20px;
}


.media-block .media-left {
  display: block;
  float: left
}

.media-block .media-right {
  float: right
}

.media-block .media-body {
  display: block;
  overflow: hidden;
  width: auto
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
  vertical-align: middle
}

.thumbnail {
  border-radius: 0;
  border-color: #e9e9e9
}

.tag.tag-sm, .btn-group-sm>.tag {
  padding: 5px 10px;
}

.tag:not(.label) {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #cdd6e1;
  font-size: 12px;
  line-height: 1.42857;
  vertical-align: middle;
  -webkit-transition: all .15s;
  transition: all .15s;
}
.text-muted, a.text-muted:hover, a.text-muted:focus {
  color: #acacac;
}
.text-sm {
  font-size: 0.9em;
}
.text-5x, .text-4x, .text-5x, .text-2x, .text-lg, .text-sm, .text-xs {
  line-height: 1.25;
}

.btn-trans {
  background-color: transparent;
  border-color: transparent;
  color: #929292;
}

.btn-icon {
  padding-left: 9px;
  padding-right: 9px;
}

.btn-sm, .btn-group-sm>.btn, .btn-icon.btn-sm {
  padding: 5px 10px !important;
}

.mar-top {
  margin-top: 15px;
}
</style>
