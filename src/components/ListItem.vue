<template>
  <div class="item-content">
    <img class="item-img" :src="item.article_pic_url" alt="">
    <div class="item-right">
      <span class="item-title">{{item.article_title}}</span>
      <div class="item-counts">
        <!--<svg class="item-icon">-->
        <!--<use xlink:href="../assets/svgs.svg"/>-->
        <!--</svg>-->
        <span class="item-text">阅读:{{item.article_browse_count}}</span>

        <!--<svg class="item-icon" style="margin-left:5px">-->
        <!--<use xlink:href="../assets/svgs.svg"/>-->
        <!--</svg>-->
        <span class="item-text">分享:{{item.article_share_count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  props: ['item','imgUrl', 'title', 'shareCount', 'browseCount'],
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
  .item-content{
    display:flex;
    flex-direction: row;
    width:calc(100% - 20px);
    height:80px;
    background-color:#fff;
    border-bottom:1px solid #eee;
    align-items:center;
    color:#000;
    margin:0 auto;
    height:100%
  }
  .item-title{
    font-size:15px;
    margin-top:10px;
    height:40px;
    overflow: hidden;
    line-height: 20px;
    text-overflow:ellipsis
  }
  .item-img{
    min-width:100px;
    max-width:100px;
    height:60px;
    background-size: 100px 60px;
    background-repeat:no-repeat;
    margin-left:10px;
    margin-right:10px;
    display:block;
  }
  .item-right{
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content:space-between;
  }
  .item-counts{
    height:30px;
    display:flex;
    flex-direction: row;
    width:100%;
    align-items:center;
    margin-bottom: 5px;
  }
  .item-text{
    color:#ccc;
    font-size:12px;
    margin: 0 2px 0 2px;
  }
</style>
