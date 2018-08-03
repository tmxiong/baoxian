/**
 * import from 和 module.exports 不能混用
 * 把module.exports 改成 export default 即可
 * */

import Vue from 'vue'
export function hideLoading (_this) {
  _this.$vux.loading.hide()
}

export function showLoading (_this, title = '正在努力加载...') {
  _this.$vux.loading.show({
    text: title
  })
}
export function vPost() {

}
export function vGet(url) {

  return new Promise((resolve, reject) => {
    Vue.http.get(url)
      .then(data => resolve(data))
      .catch( error => reject(error))
  })

}
// export default {
//   hideLoading,
//   showLoading,
//   vGet,
//   vPost,
// };

