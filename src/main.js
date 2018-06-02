// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './store'
import { AjaxPlugin, LoadingPlugin, LoadMore } from 'vux'

Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.component('LoadMore', LoadMore)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

/**
 * beforeCreate（创建前）,

 created（创建后）,

 beforeMount(载入前),

 mounted（载入后）,

 beforeUpdate（更新前）,

 updated（更新后）,

 beforeDestroy（销毁前）,

 destroyed（销毁后）
 * */
