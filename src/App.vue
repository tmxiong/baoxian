<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
.Router {
  position: absolute;
  width: 100%;
  transition: all .8s ease;
  top: 40px;
}
</style>
