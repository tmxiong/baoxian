/* ==================================================
*                       头条获客
* npm run dev
* npm run build
*
* ================================================== */
<template>
  <div class="container" ref="container">
    <header class="header" v-bind:class="[showTab ? 'header' : 'hide-header']">
      <Tab active-color="#398dee" >
        <tab-item :selected="tag === item" v-for="item in items" @click="tag = item" :key="item">{{item}}</tab-item>
      </Tab>
    </header>
    <Search v-model="searchValue" class="search1"
            v-bind:class="[showTab ? 'search1' : 'search2']"
            placeholder="输入关键字"
            @on-submit="startSearch()"
            @on-focus="onFocus()"
            @on-blur="onBlur()"
            @on-cancel="onCancel()"
            search-cancel-font-color="#f33"></Search>

    <!--<LoadMore tip="正在加载更多"></LoadMore>-->

    <div class="search-content" v-if="!showTab">

    </div>

    <ul class="item-container" v-bind:class="[showTab ? 'item-container' : 'hide-item-container']" @scroll="onScroll(e)">
      <li class="item-content" v-for="item in articleItems" :key="item.article_id">
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
      </li>
    </ul>

  </div>
</template>

<script>
    import { Tab, TabItem, Search } from 'vux'
    import urls from '../config/urls'
    import {showLoading, hideLoading} from '../utils/utils'

    export default {
      name: 'Toutiao',
      components: {
        Tab,
        TabItem,
        Search
      },
      data () {
        return {
          showTab: true,
          searchValue: '',
          tag: '推荐',
          items: ['推荐', '安邦保险', '保险动画', '保险语音', '保险视频'],
          articleItems: [],
          divHeight: 0,
          screenHeight: window.innerHeight
        }
      },
      mounted () {
        window.addEventListener('scroll', this.onScroll);
      },
      ready () {

      },
      created () {
        showLoading(this);
        this.getItems();
      },
      updated () {

      },
      destroyed () {
        window.addEventListener('scroll', this.onScroll);
      },
      methods: {
        onFocus () {
          console.log('onFocus')
          this.showTab = false
        },
        onBlur () {
          console.log('onBlur')
        },
        onCancel () {
          console.log('onCancel')
          this.showTab = true
        },
        startSearch () {
          console.log(this.searchValue)
        },
        getItems () {
          this.$http.post(urls.articleList)
            .then(({data}) => {
              console.log(data)
              this.articleItems = data.article_list
              console.log(this.divHeight);
              hideLoading(this)
            })
            .catch((e) => {
              hideLoading(this)
              console.log(e)
            })
        },
        onScroll (e) {
          this.divHeight = this.$refs.container.offsetHeight;
          let topOffset = this.divHeight - this.screenHeight;
          let scrollHeight = e.srcElement.defaultView.scrollY - 44; // 减去搜索框高度
          if(topOffset === scrollHeight) {
            console.log('下一页')
          }
        }
      }
    }
</script>

<style scoped>
  .container{
    width:100%;

  }
  .header{
    position: fixed;
    z-index: 997;
    top:0;
    width:100%;
    height:44px;
    background-color:#fff
  }
  .hide-header{
    display:none;
  }
  .search1{
    margin-top:44px;
  }
  .search2{
    margin-top:0;
  }
  .search-content{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    background-color: #fff;
    padding-top:44px;
  }
  .item-container{
    display:flex;
    width:100%;
    align-items: center;
    flex-direction: column;
    background-color:#fff;
    /*padding-top:200px;*/
    /*margin-top: -140px;*/
  }
  .hide-item-container{
    display:none
  }
  .item-content{
    display:flex;
    flex-direction: row;
    width:calc(100% - 20px);
    height:80px;
    background-color:#fff;
    border-bottom:1px solid #eee;
    align-items:center;

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
  .item-title{
    font-size:15px;
    margin-top:10px;
    height:50px;
    overflow: hidden;
    line-height: 20px;
    text-overflow:ellipsis
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
  .item-icon{
    width:20px;
    height:20px;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .item-text{
    color:#ccc;
    font-size:12px;
    margin: 0 2px 0 2px;
  }
</style>
