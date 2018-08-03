<template>
  <div class="container">
    <div ref="wrapper" style="height: 100%">
      <div class="article-container">
        <h3 style="margin-left: 10px;margin-top: 10px">{{articleTitle}}</h3>
        <div class="content" v-html="articleContent"></div>
      </div>
    </div>
  </div>


</template>

<script>
  import urls from '../config/urls'
  import {showLoading,hideLoading, vGet} from '../utils/utils'
//  import BScroll from 'better-scroll'
export default {

  data () {
    return {
      articleContent:null,
      articleTitle:'',
      scroll:null,
    }
  },
  mounted() {
    showLoading(this);
    setTimeout(()=>{
      this.getParams();
    },400);

  },
  methods: {
    getParams() {
      let id = this.$route.params.articleID;
      this.getArticle(id);
    },
    async getArticle(id) {
      let url = urls.articleDetail+'?article_id='+id;
      try{
        let data = await vGet(url);
        this.setArticle(data.data);
        hideLoading(this);
      }catch(e){
        hideLoading(this)
      }

    },
    setArticle(content){
      this.articleContent = content.article_detail.article_content;
      this.articleTitle = content.article_detail.article_title;
//      this.$nextTick(()=>{
//        this.scroll = new BScroll(this.$refs.wrapper,{
//          scrollbar: {
//            fade: true,
//            interactive: false // 1.8.0 新增
//          }
//        })
//      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #fff;
    z-index: 999;
    overflow: scroll;
  }
  .article-container{
    display:flex;
    background-color:#fff;
    flex:1;
    flex-direction: column;
    width:100%;
  }
  .content{
    padding:10px
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
