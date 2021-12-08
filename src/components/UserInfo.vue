<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <p>Nickname:</p>
                  <h4>{{user_info.nickname}}</h4>
                  <p>First Name:</p>
                  <p class="text-secondary mb-1">{{user_info.first_name}}</p>
                  <p>Last Name:</p>
                  <p class="text-muted font-size-sm">{{user_info.last_name}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">State</h6>
                <span class="text-secondary">{{user_info.addr_info.state}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">City</h6>
                <span class="text-secondary">{{user_info.addr_info.city}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Street 1</h6>
                <span class="text-secondary">{{user_info.addr_info.street_line_1}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Street 2</h6>
                <span class="text-secondary">{{user_info.addr_info.street_line_2}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Zip Code</h6>
                <span class="text-secondary">{{user_info.addr_info.zip_code}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div v-if="user_info.bookmarks.length > 0" class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Author</h6>
                </div>
                <div class="col-sm-9">
                  <h6 class="mb-0">Title</h6>
                </div>
              </div>
              <hr>
              <div v-for="(bookmark, idx) in user_info.bookmarks"
                   :key="idx"
                   class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"><router-link :to="{
                    name: 'user_info',
                    params: {
                      name: bookmark.user_id
                    }
                  }">{{bookmark.nickname}}</router-link>
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary"><router-link :to="{
                  name: 'post_content',
                  params: {
                    post_id: bookmark.post_id
                  }
                }">{{bookmark.title}}</router-link>
                </div>
                <hr>
              </div>
            </div>
            <div v-else class="card-body">
              {{user_info.nickname}} now does not have a bookmark!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      helper: true,
      name: this.$route.params.name,
      user_info: {}
    }
  },
  methods: {
    testUserInfo: function() {
      this.user_info = {}
      let u = this.user_info
      u['nickname'] = 'name1'
      u['first_name'] = 'Yihan'
      u['last_name'] = 'Yin'
      u['addr_info'] = {}
      u['addr_info']['state'] = 'NO INFO'
      u['addr_info']['city'] = 'NO INFO'
      u['addr_info']['street_line_1'] = 'NO INFO'
      u['addr_info']['street_line_2'] = 'NO INFO'
      u['addr_info']['zip_code'] = 'NO INFO'
      let bookmark1={}, bookmark2={}, bookmark3={}
      u['bookmarks'] = [bookmark1, bookmark2, bookmark3]
      bookmark1['user_id']='1f6e0895-3899-42d7-a738-6a9fd72cc6a0'
      bookmark1['title']='t1'
      bookmark1['post_id']='7aa0838e-6cad-4a61-b409-77b288c83920'
      bookmark1['nickname']='name1'
      bookmark2['user_id']='1f6e0895-3899-42d7-a738-6a9fd72cc6a0'
      bookmark2['title']='t1'
      bookmark2['post_id']='8369da2c-2866-497d-af5e-8e298bcbc16d'
      bookmark2['nickname']='name1'
      bookmark3['user_id']='1f6e0895-3899-42d7-a738-6a9fd72cc6a0'
      bookmark3['title']='t1'
      bookmark3['post_id']='c0428794-21a9-4003-9112-0d4a81560b45'
      bookmark3['nickname']='name1'
    },
    getUserInfo: function() {
      let params = {}
      if (this.name !== 'self') {
        params['user_id'] = this.name
      }
      this.$http.get("https://d2tvlmotz0dchv.cloudfront.net/api/userprofile", {
        params:{
          params
        },
        headers:{
          id_token: this.$root.id_token
        }
      })
        .then((res)=>{
          this.user_info = res.data.data
          console.log(this.user_info)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  beforeMount() {
    // this.getUserInfo()
    this.testUserInfo()
  }
}
</script>

<style scoped>
body{
  margin-top:20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}
.main-body {
  padding: 15px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3, .my-3 {
  margin-bottom: 1rem!important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100%!important;
}
.shadow-none {
  box-shadow: none!important;
}
</style>
