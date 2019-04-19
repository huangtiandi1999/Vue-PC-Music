<template>
    <div>
      <!-- 热门歌单 -->
      <HotMusicSheet></HotMusicSheet>
      <!-- 新歌首发 -->
      <StartingMusic></StartingMusic>
    </div>
</template>

<script>
  import HotMusicSheet from './HomeInnerComponents/HotMusicSheet'
  import StartingMusic from './HomeInnerComponents/StartingMusic'
    export default {
      name: "Home",
      components:{
        HotMusicSheet,
        StartingMusic
      }
    }
</script>

<style>
  @import '../assets/css/Home.css';
</style>
