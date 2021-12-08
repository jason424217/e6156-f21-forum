<template>
  <div>
    <div class="title-box">
      <input type="text" class="title" v-model="post.title" placeholder="Input your title...">
      <button @click="submit">Submit</button>
    </div>
    <mavon-editor language="en" v-model="post.content" class="editor"/>
  </div>

</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      post: {
        title:"",
        content:""
      }
    }
  },
  methods:{
    submit:function() {
      this.$http.post("https://d2tvlmotz0dchv.cloudfront.net/api/posts", this.post,  {
        headers:{
          id_token: this.$root.id_token
        }
      })
      .then((res=>{
        console.log(res)
        if (res.status < 300) {
          this.$notify({
            title: 'Notification',
            text: `"${this.post.title}" successfully created!`,
            type: 'success'
          })
          this.$router.push('/posts')
        }
      }))
      .catch((err)=>{
        console.log(err)
        this.$notify({
          title: 'Error',
          text: `"${this.post.title}" create error!`,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
.title-box {

  display: grid;
  grid-template-columns: 22fr 2fr;
}
.title {

  background-color: white;
  color: #303133;
  text-indent: 0;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  display: block;

  border: none;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
  line-height: 1;
  overflow: visible;
  margin-bottom: 15px;
  padding: 4px;
}
.title:focus {

  border-color: #409eff;
}
.editor {
  height: 650px;
}
</style>
