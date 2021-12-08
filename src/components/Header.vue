<template>
  <div class="header">
  <img src="../assets/mountain.svg" alt="logo">
  <span v-if="this.$root.logged_in" class="span">Welcome to E6156 Himalayas Forum, {{this.$root.email}}</span>
    <notifications position="top right" />


    <ul>
     <router-link :to="{
      name:'root',
      }"> <li v-if="this.$root.logged_in"><router-link to="/posts">Home page</router-link></li>
      </router-link>

      <li v-if="this.$root.logged_in">
        <router-link :to="{
          name: 'user_info',
          params: {
            name: 'self'
          }
        }">User Profile</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .header{
   background: rgba(253, 253, 253, 0.2);
   height: 50px;
 }
 .span{
   color: rgb(2, 250, 209);
   position: absolute; top: 25px; left: 150px;
   font-size: 18px;
 }
img{
   max-width: 120px;
   margin-left: 50px;
   margin-top: 10px;
 }
 ul{
   list-style: none;
   float: right;
   margin-right:40px ;

 }
 li{
   display: inline-block;
   padding: 0 10px;
 }
 a{
    text-decoration: none;
    color: rgb(2, 250, 209);
    font-size: 18px;
    text-shadow: none;
 }
</style>
