<template>
    <div class="singer_info">
      <span class="singer_img_wrap">
        <img class="singer_big_img" :src="this.Info.singer_inf.photo1"/>
      </span>
      <div class="singer_introduce">
        <div class="singer_intro_name"><h1 class="singer_intro_h">{{this.Info.singer_inf.name}}</h1></div>
        <div class="singer_intro_main">
          <div class="singer_intro_main_des_text">
            {{this.Info.singer_inf.introduce}}
          </div>
        </div>
        <ul>
          <li>
            <a href="javascript:;">
              <span>单曲</span>
              <span>{{this.Info.music_inf.songName.length}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>专辑</span>
              <span>{{this.Info.music_inf.Albums.length}}</span>
            </a>
          </li>
          <li></li>
        </ul>
        <div>
          <a href="javascript:;"><i></i>播放歌手热门歌曲</a>
          <a href="javascript:;"><i></i>关注</a>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SingerInfo",
      props:['Info']
    }
</script>

<style scoped>

</style>
