<template>
  <div id="app">
    <!-- 头部导航组件 -->
    <Header></Header>
    <!---->
  </div>
</template>

<script>
  import Header from './components/Header';
export default {
  name: 'App',
  components:{
    Header,
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
