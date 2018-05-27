
function hideLoading (_this) {
  _this.$vux.loading.hide()
};

function showLoading (_this, title = '正在努力加载...') {
  _this.$vux.loading.show({
    text: title
  })
}

module.exports = {
  hideLoading,
  showLoading
}
