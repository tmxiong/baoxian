<template>
  <div class="container">
    <h3 style="margin-left: 10px;margin-top: 10px">{{articleTitle}}</h3>
    <div class="content" v-html="articleContent"></div>
  </div>
</template>

<script>
  import urls from '../config/urls'
export default {

  data () {
    return {
      articleContent:null,
      articleTitle:''
    }
  },
  mounted() {
    this.getParams();
  },
  methods: {
    getParams() {
      let id = this.$route.params.articleID
      this.getArticle(id);
    },
    getArticle(id) {
      this.$http.get(urls.articleDetail+'?article_id='+id)
        .then(data => this.setArticle(data.data))
        .catch(e => console.log(e))
    },
    setArticle(content){
      this.articleContent = content.article_detail.article_content;
      this.articleTitle = content.article_detail.article_title;

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    display:flex;
    background-color:#fff;
    flex:1;
    flex-direction: column;
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    z-index:999
  }
  .content{
    padding:10px
  }
</style>
