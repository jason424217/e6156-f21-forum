<template>
<!--    <div class="pagination">-->
<!--        <button @click="changeBtn">first</button>-->
<!--        <button @click="changeBtn">prev</button>-->
<!--        <button v-if="judge" class="pagebtns">......</button>-->
<!--        <button v-for="btn in pagebtns" :key="btn.num"-->
<!--        @click="changeBtn(btn)"-->
<!--        :class="[{currentPage:btn===currentPage},'pagebtns']">-->
<!--            {{btn}}-->
<!--        </button>-->
<!--        <button @click="changeBtn">next</button>-->
<!--        <button @click="changeBtn">last</button>-->
<!--    </div>-->
  <div class="pagination">
    <button @click="prevOrNext(-1)">prev</button>
    <button v-for="(page, idx) in pagebtns"
        :key="idx"
        :class="{activated: page === currentPage}"
        @click="changeBtn(page)"
    >{{page}}</button>
    <button @click="prevOrNext(1)">next</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "Pagination",
  data() {
    return {
       currentPage:1,
    };
  },
  props:{
    totalItems: Number,
    itemsPerPage: Number
  },
  computed:{
    totalPages:function(){
      let mod = this.totalItems % this.itemsPerPage
      let res = (this.totalItems / this.itemsPerPage) | 0
      if (mod === 0) {
        return res
      } else {
        return res + 1
      }
    },
    pagebtns:function(){
      const c = this.currentPage
      const t = this.totalPages
      if (t <= 5) {
        let res = new Array(t)
        for (let i = 1; i <= t; i++) {
          res[i - 1] = i
        }
        return res
      } else if (c <= 3) {
        return [1,2,3,4,5,'...',t]
      } else if (c >= t - 2) {
        return [1,'...',t-4,t-3,t-2,t-1,t]
      } else {
        return [1,'...',c-2,c-1,c,c+1,c+2,'...',t]
      }
    }
  },
  methods:{
      changeBtn:function(page){
        console.log(page)
        if (page === this.currentPage) return
        if (typeof page === 'string') return
        this.currentPage = page
        this.$emit('handle', this.currentPage)
      },
      prevOrNext(n) {
        this.currentPage += n
        if (this.currentPage < 1) {
          this.currentPage = 1
          return
        } else if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages
          return
        }
        console.log(this.currentPage)
        this.$emit('handle', this.currentPage)
      }
  }
};
</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  .activated {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
    color: #fff;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>
