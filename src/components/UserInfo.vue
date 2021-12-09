<template>
  <div class="container">
    <div class="loading" v-if="isLoading">
      <img  src="../assets/loading2.gif" alt="">
    </div>
    <div class="main-body" v-else>
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
                <span class="text-secondary">{{user_info.addr_info.state | formatUndefined}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">City</h6>
                <span class="text-secondary">{{user_info.addr_info.city | formatUndefined}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Street 1</h6>
                <span class="text-secondary">{{user_info.addr_info.street_line_1 | formatUndefined}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Street 2</h6>
                <span class="text-secondary">{{user_info.addr_info.street_line_2 | formatUndefined}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Zip Code</h6>
                <span class="text-secondary">{{user_info.addr_info.zip_code | formatUndefined}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div v-if="user_info.bookmark_info.length > 0" class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Author</h6>
                </div>
                <div class="col-sm-9">
                  <h6 class="mb-0">Title</h6>
                </div>
              </div>
              <hr>
              <div v-for="(bookmark, idx) in user_info.bookmark_info"
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
      isLoading: false,
      name: this.$route.params.name,
      user_info: {}
    }
  },
  methods: {
    getUserInfo: function() {
      let params = {}
      if (this.name !== 'self') {
        params['user_id'] = this.name
      }
      this.$http.get("https://d2tvlmotz0dchv.cloudfront.net/api/userprofile", {
        params,
        headers:{
          id_token: this.$root.id_token
        }
      })
        .then((res)=>{
          console.log(res)
          this.user_info = res.data.data
          this.isLoading = false
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getUserInfo()
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
.loading {
  text-align: center;
  padding: 200px;
  opacity: 0.7;
}
</style>
