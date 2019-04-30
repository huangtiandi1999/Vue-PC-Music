<template>
  <div id="app">
    <!-- 头部导航组件 -->
    <Header v-if="show"></Header>
    <!--主要部分 -->
    <transition name="component-fade">
      <router-view/>
    </transition>
    <!-- 悬挂件 -->
    <div v-show="show" class="fixed_download">
      <img class="fixed_download_img" src="http://imgcache.gtimg.cn/mediastyle/yqq/img/logo.png"/>
      <p class="fixed_download_text">千万高品质曲库尽享</p>
      <a class="fixed_download_btn" href="javascript:;"><i class="music_icon fixed_download_btn_icon"></i>PC版下载</a>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header';
export default {
  name: 'App',
  components:{
    Header,
  },
  computed:{
    show(){
      return this.$store.getters.isShow;
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .fixed_download{
    position: fixed;
    top: 164px;
    right: 40px;
    z-index: 999;
    padding: 18px;
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0,0,0,.07);
    background: #fff;
  }
  .fixed_download_img{
    display: block;
    margin: 0 auto 9px;
    width: 102px;
  }
  .fixed_download_text{
    margin-bottom: 10px;
    font-size: 16px;
    color: #a6a6a6;
    text-align: center;
  }
  .fixed_download_btn{
    margin: 0 auto;
    width: 130px;
    height: 26px;
    border-radius: 26px;
    font-size: 15px;
    color: #fff;
    display: block;
    text-align: center;
    background: #31c27c;
  }
.fixed_download_btn_icon{
  display: inline-block;
  margin-right: 4px;
  vertical-align: -1px;
  width: 14px;
  height: 13px;
  background-position: -160px -320px;
  /* 该属性设为负数将使得该元素下移 */
}
  .fixed_download_btn:hover{
    background: #2caf6f;
    color: #fff;
  }
</style>
