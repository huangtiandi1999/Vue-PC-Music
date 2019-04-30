<template>
    <div class="extent_body">
      <!-- 播放页面标题 -->
      <h1 class="play_logo">
        <a href="javascript:;"><img class="play_logo_img" src="../assets/images/player_logo.png"/></a>
      </h1>
      <!-- 登录账户区域 -->
      <div class="play_login_wrap">
        <div class="des_text">
          QQ音乐，千万高品质曲库尽享
          <a href="javascript:;" class="download_client_btn"><i class="music_icon fixed_download_btn_icon"></i>PC版下载</a>
        </div>
        <a href="javascript:;" class="play_set_btn"><span class="play_set_text">设置</span></a>
      </div>
      <!-- 主体内容 -->
      <div class="mod_player">
        <div class="mod_player_body">
          <!-- 默认模式 使用左边2个右边一个div的布局方式 -->
          <div class="mod_default_body">
            <ToolBar></ToolBar>
            <div class="mod_default_view">
              <div class="mod_songlist_area">
                <!-- 顶端分割线 -->
                <i class="play_line"></i>
                <ul class="mod_songlist_header">
                  <li class=""><!-- 这个li元素用来全选 暂时先不管 --></li>
                  <li class="song_name">歌曲</li>
                  <li class="song_singer">歌手</li>
                  <li class="song_time">时长</li>
                </ul>
                <!-- 分割线 -->
                <i class="play_line"></i>
                <ul>

                </ul>
              </div>
            </div>
            <div class="mod_default_songinfo"></div>
          </div>
          <!-- 纯净模式 -->
          <div></div>
        </div>
        <div class="mod_player_footer">

        </div>
      </div>
      <div class="player_cover_mask"></div>
    </div>
</template>

<script>
  import ToolBar from './PlayerComponents/PlayToolbar'
    export default {
       name: "player",
       components:{
         ToolBar
       },
       data() {
         return {
           songName: this.$route.query.song,
           singerName: this.$route.query.singer
         }
       },
       created() {
          let token=setTimeout(function () {
            document.title = this.$store.getters.NowPlay.song + "-" + this.$store.getters.NowPlay.singer + "..." + "正在播放" + " ";
            var text = document.title;
            document.title = text.substring(1,text.length) + text.substring(0,1);
          },700)
        },
        //设置导航守卫
        beforeRouteEnter(to, from, next) {
          //用回调方式获取该组件实例
          document.querySelector("body").setAttribute("style","background-color:rgb(127,78,102)");
          next(vm => {
            vm.$store.dispatch('hideHeader');
          })
        },
        beforeRouteLeave(to, from, next) {
         document.querySelector("body").removeAttribute("style");
          this.$store.dispatch('showHeader');
          // 退出该路由后title不再滚动
          clearInterval(this.timer);
          next();
        }
    }
</script>

<style>
  @import "../assets/css/Player.css";
</style>
