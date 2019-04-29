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
      },
      created() {
        document.title="Music-千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！"
      }
    }
</script>

<style>
  @import '../assets/css/Home.css';
</style>
