<template>
  <div class="wrapper" ref="wrapper">
    <div class="container">
      <div class="item-container">
        <router-link v-for="item in data" :key="item.article_id" :to="{ name: 'toutiaoDetail', params: { articleID : item.article_id }}" style="display: block;width:100%;background-color: #fff">
          <ListItem :item="item"></ListItem>
        </router-link>
      </div>
    </div>

  </div>


</template>

<script>
  import urls from '../config/urls'
  import ListItem from '../components/ListItem.vue'
  import BScroll from 'better-scroll'
export default {
  name: 'HelloWorld',
  components : {
    ListItem
  },
  data () {
    return {
      data: [],
      page:0,
      scroll:null
    }
  },
  created() {
    this.getItems('保险',this.page);
  },
  methods: {
    getItems(keywords,page) {
      let url = urls.searchArticle.replace('{keywords}',keywords);
      url = url.replace('{pageIndex}',page);
      this.$http.get(url)
        .then(data => {
//          console.log(this.data.concat(data.data.data));
          this.data = this.data.concat(data.data.data);
          this.$nextTick(()=>{
              if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper,{})
              }
          })
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    position: absolute;  left: 0;  top: 0;  overflow: hidden; height: 100%;width:100%
  }
  .container{
    width:100%;
    display:flex;
    flex-direction: column;
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
    /*margin-top:88px;*/
    /*padding-top:200px;*/
    /*margin-top: -140px;*/
  }
</style>
