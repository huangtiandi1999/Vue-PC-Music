<template>
    <div class="header_wrapper">
      <div class="section_inner">
        <!-- logo 标题-->
        <h1 class="music_title">
          <a href="javascript:;"><img src="../assets/images/logo.png" alt="QQ音乐" class="music_logo"/></a>
        </h1>
        <!-- 顶部导航栏 -->
        <AbNav></AbNav>
        <!-- 底部导航栏 -->
        <ReNav></ReNav>
        <!-- 搜索框 -->
        <SearchBox></SearchBox>
        <!-- 用户头像区域 -->
        <component :is="CurrentComponent"></component>
      </div>
    </div>
</template>

<script>
  import AbNav from './innerComponents/AbNav'
  import ReNav from './innerComponents/ReNav'
  import SearchBox from './innerComponents/SearchBox'
  import UnLoginArea from './innerComponents/UnLoginArea'
  import LoginAfter from './innerComponents/LoginAfter'
    export default {
      name: "Header",
      components:{
        AbNav,
        ReNav,
        SearchBox,
        UnLoginArea,
        LoginAfter
      },
      data(){
        return {

        }
      },
      computed:{
        CurrentComponent(){
          return !!(this.$store.getters.User) ? "LoginAfter" : "UnLoginArea";
        }
      }
    }

</script>
<style>
  @import "../assets/css/Header.css";
</style>
