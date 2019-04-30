<template>
    <div class="singer_main" v-if="singerInformation">
      <!-- 歌手介绍区域 父子组件通信-->
      <SingerInfo :Info="singerInformation"></SingerInfo>
      <!-- 歌手作品区域 -->
      <div class="singer_wrap">
        <div class="singer_list_part">
          <div class="singer_part_head">
            <h2 class="singer_part_title">热门歌曲</h2>
          </div>
          <div class="song_list_wrap">
            <ul class="song_list_head">
              <li class="song_list_head_name">歌曲</li>
              <li class="song_list_head_album">专辑</li>
              <li class="song_list_head_time">时长</li>
            </ul>
            <ul class="song_list_content">
              <li v-for="(item,index) of singerInformation.music_inf.songName">
                <div class="song_list_item">
                  <div class="song_list_item_index song_list_col">{{index+1}}</div>
                  <div class="song_list_songname song_list_col">
                    <i class="music_icon dujia_icon" title="独家"></i>
                    <span class="song_list_songname_text">
                      <a href="javascript:;">{{item.name}}</a>
                    </span>
                    <div class="tool_nav_menu">
                      <a href="javascript:;" class="tool_menu_item tool_play" title="播放" @click="playSong(item.name,singerName)"><i class="play_icon song_menu_icon"></i></a>
                      <a href="javascript:;" class="tool_menu_item tool_add" title="添加到歌单"><i class="add_icon song_menu_icon"></i></a>
                      <a href="javascript:;" class="tool_menu_item tool_download" title="下载"><i class="download_icon song_menu_icon"></i></a>
                      <a href="javascript:;" class="tool_menu_item tool_share" title="分享"><i class="share_icon song_menu_icon"></i></a>
                    </div>
                  </div>
                  <div class="song_list_albumname song_list_col"><a href="javascript:;">{{item.album}}</a></div>
                  <div class="song_list_songtime song_list_col">04:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import SingerInfo from './SingerComponents/SingerInfo'
    export default {
      name: "SingerIndex",
      components:{
        SingerInfo,
      },
      data(){
        return{
          singerInformation:null,
        }
      },
      computed:{
        singerName(){
          return this.$route.params.sn;
        }
      },
      created() {
        this.FilterSingerData();
        document.title=this.$route.params.sn+" - Music-千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！"
      },
      watch:{
        '$route':'FilterSingerData'
      },
      methods:{
        FilterSingerData(){
          var self=this;
          const loading=this.$loading({
            text:'Loading...',
            background:'rgba(0,0,0,0.7)'
          })
          var name=self.$route.params.sn;
          var promise=new Promise((resolve, reject) => {
            try {
              setTimeout(function () {
                var music_inf=self.$store.state.Music.find(music => music.singerName == name)
                var singer_inf=self.$store.state.Singers.find(singer => singer.name==name)
                self.singerInformation={
                  music_inf,
                  singer_inf
                }
                loading.close();
                resolve("请求完成");
              },500);
            }
            catch (e) {
              reject(e);
            }
          })
            .then(data=>{
              console.log(data);
            },err=>{
              console.log(err);
            })
        },
        playSong(song,singer){
          this.$store.dispatch('SetNowPlay',{song,singer});
          this.$router.push({name:'player'});
        }
      }
    }
</script>

<style>
  @import "../assets/css/Singer.css";
</style>
