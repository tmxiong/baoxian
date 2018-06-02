import Vue from 'vue'
import Router from 'vue-router'

import PageTransition from '../components/PageTransition';
import Home from '../components/Toutiao'
import ToutiaoDetail from '../components/ToutiaoDetail'
Router.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // hashbang: false,
  // history: true,
  // transitionOnLoad:true,
  routes: [
    // {
    //   path: '/',
    //   name: 'PageTransition',
    //   component: PageTransition, // 引入页面切换组件
    //   children: [
        {path: '/', name:'Home', component: Home,},
        {path: '/toutiaoDetail', name:'toutiaoDetail', component: ToutiaoDetail}
      // ]
    // }
  ]
})
