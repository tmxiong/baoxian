/* ==================================================
*                       头条获客
* npm run dev
* npm run build
*
* ================================================== */
<template>
  <div class="container" ref="container">
    <header class="header" :class="[showTab ? 'header' : 'hide-header']">
      <Tab active-color="#398dee" >
        <tab-item :selected="tag === item" v-for="item in tabs" @click="tag = item" :key="item">{{item}}</tab-item>
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

    <!--<LoadMore :show-loading="false" tip="结束探索-海拔高度8864"></LoadMore>-->

    <div class="search-content" v-if="!showTab">

    </div>

    <div class="item-container" :class="[showTab ? 'item-container' : 'hide-item-container']" >

      <router-link to="toutiaoDetail" v-for="item in articleItems" :key="item.article_id" style="display: block;width:100%;background-color: #fff">
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
      </router-link>
      <div class="list-footer">
        <LoadMore tip="正在加载更多" v-if="showLoadMore"></LoadMore>
        <LoadMore :show-loading="false" :tip="'结束探索-海拔高度:'+this.articleItems.length*1000+'米'" v-if="showLoadMoreEnd">{{}}</LoadMore>
      </div>
    </div>



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
          tabs: ['推荐', '安邦保险', '保险动画', '保险语音', '保险视频'],
          articleItems: [],
          divHeight: 0,
          screenHeight: window.innerHeight,
          showLoadMore: false,
          showLoadMoreEnd: false,
          lastArticleID: 0, // 13748 // 后面无文章
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
          this.$http.get(urls.articleList+'?last_article_id='+this.lastArticleID)
            .then(({data}) => {
              console.log(data)
              if(data.status === 1) {
                this.articleItems = this.articleItems.concat(data.article_list);
                this.lastArticleID = data.last_article_id;
                this.showLoadMore = false;
//                this.lastArticleID = 13748;
                //console.log(this.divHeight);
                hideLoading(this);
              }else {
                this.showLoadMore = false;
                this.showLoadMoreEnd = true;
              }

            })
            .catch((e) => {
              hideLoading(this)
              console.log(e)
            })
        },
        onScroll (e) {
          try{this.divHeight = this.$refs.container.offsetHeight;}catch(e){}

          let topOffset = this.divHeight - this.screenHeight;
          let scrollHeight = e.srcElement.defaultView.scrollY;
//          console.log(topOffset)
//          console.log(scrollHeight)
          if(topOffset <= (scrollHeight + 44)) {
            if(!this.showLoadMoreEnd && !this.showLoadMore) {
              this.showLoadMore = true;
              console.log('下一页')
              this.getItems();
            }

          } else {
            //this.showLoadMore = false;
          }
        },
        go(event) {
          console.log(event);
          event.preventDefault()
          this.$root.currentRoute = this.href
          window.history.pushState(
            null,
            this.$routes[this.href],
            this.href
          )
        }
      }
    }
</script>

<style scoped>
  .container{
    width:100%;
    display:flex;
    flex:1;
    flex-direction: column;
    overflow: scroll;

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
    flex:1;
    height:100%;
    color:#000
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
    color:#000;
    margin:0 auto;

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
  .list-footer{
    width:100%;
    height:66px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
