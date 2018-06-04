/** ==================================================
*                       头条获客
* npm run dev
* npm run build
* 如何让better-scroll 滚动？
* <div ref="wrapper" style="position: absolute;  left: 0;  top: 0;  overflow: hidden; height: 100%">
*   <div class="list-container"></div>  不能设置height：100%
* </div>
*
* ================================================== */


<template>
  <div>
    <header class="header">
      <Tab active-color="#398dee">
        <tab-item :selected="tag === item" v-for="item in tabs" @click="tag = item" :key="item">{{item}}</tab-item>
      </Tab>
      <Search v-model="searchValue" class="search1"
              v-bind:class="[showTab ? 'search1' : 'search2']"
              placeholder="输入关键字"
              @on-submit="startSearch()"
              @on-focus="onFocus()"
              @on-blur="onBlur()"
              @on-cancel="onCancel()"
              search-cancel-font-color="#f33"></Search>
    </header>
    <div class="search-content" v-if="!showTab">
      <div>454646464</div>
      <div>454646464</div>
      <div>454646464</div>
      <div>454646464</div>
      <div>454646464</div>
    </div>
    <div ref="wrapper" style="position: absolute;  left: 0;  top: 0;  overflow: hidden; height: 100%">
      <div class="container" ref="container">

        <div class="item-container">

          <router-link v-for="item in articleItems" :key="item.article_id" :to="{ name: 'toutiaoDetail', params: { articleID : item.article_id }}" style="display: block;width:100%;background-color: #fff">
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
    </div>

    <router-view></router-view>
  </div>

</template>

<script>
    import { Tab, TabItem, Search } from 'vux'
    import urls from '../config/urls'
    import {showLoading, hideLoading} from '../utils/utils'
    import BScroll from 'better-scroll'

    export default {
      name: 'Toutiao',
      components: {
        Tab,
        TabItem,
        Search
      },
      data () {
        return {
          scroll:null,
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
      ready () {

      },
      created () {

      },
      mounted () {

        showLoading(this);
        this.getItems();
      },
      updated () {

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
                if(this.scroll){this.scroll.finishPullUp();}

                this.$nextTick(() => {
                  if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                      click: true,
                      //swipeTime: 800,
                      pullUpLoad: {
                        threshold: 50
                      },
                      scrollbar: {
                        fade: true,
                        interactive: false // 1.8.0 新增
                      }
                    });
                    this.scroll.on('pullingUp', ()=>{
                      console.log('pullingUp');
                      if(!this.showLoadMoreEnd && !this.showLoadMore) {
                        this.showLoadMore = true;
                        this.getItems();
                      }
                    })

                  }else{
                    this.scroll.refresh()
                  }

                })

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
    flex-direction: column;
  }
  .header{
    position: fixed;
    z-index: 997;
    top:0;
    width:100%;
    /*height:44px;*/
    background-color:#fff
  }
  .hide-header{
    display:none;
  }
  .search1{
    /*margin-top:44px;*/
    width:100%
  }
  .search2{
    margin-top:0;
    width:100%
  }
  .search-content{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    background-color: #fff;
    padding-top:44px;
    z-index: 2;
  }
  .item-container{
    display:flex;
    width:100%;
    align-items: center;
    flex-direction: column;
    background-color:#fff;
    flex:1;
    height:100%;
    color:#000;
    margin-top:88px;
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
    height:100%

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



  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
