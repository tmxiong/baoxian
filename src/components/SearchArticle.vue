<template>
  <div style="height:calc(100% - 80px);margin-top: 44px">
    <div class="wrapper" ref="wrapper">
      <div class="item-container">
        <div class="hot-search-container" v-if="showHotSearch">
          <p style="margin-top:20px">热门搜索:</p>
          <div class="search-words-content">
            <span @click="setKeywords('保险')" class="search-words">保险</span>
            <span @click="setKeywords('马云')" class="search-words">马云</span>
            <span @click="setKeywords('马化腾')" class="search-words">马化腾</span>
            <span @click="setKeywords('李彦宏')" class="search-words">李彦宏</span>
          </div>
        </div>
        <router-link v-for="item in data" :key="item.article_id" :to="{ name: 'toutiaoDetail', params: { articleID : item.article_id }}" style="display: block;width:100%;background-color: #fff">
          <ListItem :item="item"></ListItem>
        </router-link>
        <div class="list-footer">
          <LoadMore tip="正在加载更多" v-if="showLoadMore"></LoadMore>
          <LoadMore :show-loading="false" :tip="'结束探索-海拔高度:'+this.data.length*1000+'米'" v-if="showLoadMoreEnd"></LoadMore>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  import urls from '../config/urls'
  import ListItem from '../components/ListItem.vue'
  import BScroll from 'better-scroll'
  import bus from '../utils/bus'
  import {showLoading, hideLoading} from '../utils/utils'
export default {
  name: 'HelloWorld',
  components : {
    ListItem
  },
  data () {
    return {
      data: [],
      page:0,
      keywords:null,
      scroll:null,
      showLoadMore: false,
      showLoadMoreEnd: false,
      showHotSearch:true
    }
  },
  created() {
    bus.$on('change', (data) => {
      this.setKeywords(data);
    });
  },
  methods: {
    setKeywords(k){
      this.keywords = k;
      this.showHotSearch = false;
      this.getItems(k,0);
      this.data = [];
      showLoading(this)
    },
    getItems(keywords,page) {
      let url = urls.searchArticle.replace('{keywords}',keywords);
      url = url.replace('{pageIndex}',page);
      this.$http.get(url)
        .then(data => {
          console.log(data);
          hideLoading(this);
          if(data.status === 200) {
            this.data = this.data.concat(data.data.data);
            this.showLoadMore = false;
            if(this.scroll){this.scroll.finishPullUp();}
            this.$nextTick(()=>{
              if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper,{
                  click: true,
                  //swipeTime: 800,
                  pullUpLoad: {
                    threshold: 50
                  },
                  scrollbar: {
                    fade: true,
                    interactive: false // 1.8.0 新增
                  }
                })
                this.scroll.on('pullingUp', ()=>{
                  console.log('pullingUp');
                  if(!this.showLoadMoreEnd && !this.showLoadMore) {
                    this.showLoadMore = true;
                    this.page++;
                    console.log(this.page);
                    this.getItems(this.keywords,this.page);
                  }
                })
              }else {
                this.scroll.refresh()
              }
            })
          }else {
            this.showLoadMore = false;
            this.showLoadMoreEnd = true;
          }

        })
        .catch(e=>{
          if(this.page>0){
            this.page--;
          }

          hideLoading(this);
          this.showLoadMore = false;
          if(this.scroll){this.scroll.finishPullUp();}
          this.$vux.toast.show({
            type:'warn',
            text: '网络错误'
          });
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    position: absolute;  left: 0;  top: 0;  height: 100%;width:100%
  }
  .item-container{
    display:flex;
    width:100%;
    align-items: center;
    flex-direction: column;
    background-color:#fff;
    flex:1;
    color:#000;
    /*margin-top:88px;*/
    /*padding-top:200px;*/
    /*margin-top: -140px;*/
  }
  .hot-search-container{
    width:calc(100% - 40px);

  }
  .search-words-content{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width:100%
  }
  .search-words{
    min-width:70px;
    height:30px;
    border-radius: 8px;
    border: 1px solid #0f87eb;
    text-align: center;
    color:#0f87eb;
    font-weight: bold;
    line-height: 30px;
    margin-right: 10px;
    margin-top:20px
  }
  .list-footer{
    width:100%;
    height:66px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
