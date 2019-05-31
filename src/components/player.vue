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
      <div class="mod_player" ref="rela">
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
                  <li v-for="(item,index) of songlist">
                    <div class="mod_songlist_item">
                      <div class="mod_songlist_index">{{index+1}}</div>
                      <div class="mod_songlist_songname">
                        <span :title="item.name">{{item.name}}</span>
                        <div class="mod_list_menu">
                          <a title="播放" href="javascript:;" @click="play(item,index)"><i class="song_menu_icon" :class="{'player_icon':!isplaying,'pause_icon':isplaying && playsongindex==index}"></i></a>
                          <a title="添加到歌单" href="javacript:;"><i class="song_menu_icon add_icon"></i></a>
                          <!-- 下载按钮 暂时先展示 可以在数据中决定是否可以下载 -->
                          <a title="下载" href="javascript:;" v-show="true"><i class="song_menu_icon download_icon"></i></a>
                          <a title="分享" href="javascript:;"><i class="song_menu_icon share_icon"></i></a>
                        </div>
                      </div>
                      <div class="mod_songlist_singername"><a href="javascript:;">{{item.singer}}</a></div>
                      <div class="mod_songlist_time">NAN</div>
                      <i class="play_line sec"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mod_default_songinfo" v-if="playsong">
              <div class="mod_default_songinfo_top">
                <a class="playing_song_img" href="javascript:;">
                  <img :src="playsong.photo">
                </a>
                <div class="playing_songname">
                  歌曲名：<a href="javacript:;">{{playsong.name}}</a>
                </div>
                <div class="playing_singer">
                  歌手名：<a href="javascript:;">{{playsong.singer}}</a>
                </div>
                <div class="playing_album">
                  专辑名：<a href="javascript:;">{{playsong.album}}</a>
                </div>
              </div>
              <!-- 歌词部分 目前数据中未存储歌词 -->
              <div></div>
            </div>
          </div>
          <!-- 纯净模式 -->
          <div></div>
        </div>
        <div class="mod_player_footer" v-if="playsong">
          <!-- 一组播放控件 -->
          <a href="javascript:;" title="alt+←" class="control_icon previous_music_icon" @click="playprevious"><span></span></a>
          <a href="javascript:;" class="control_icon play_music_icon" :class="{'play_state_pause':isplaying}" @click="controlplay"><span></span></a>
          <a href="javascript:;" title="alt+→" class="control_icon next_music_icon" @click="playnext"><span></span></a>
          <!-- 播放滚动条 -->
          <div ref="k" id="k" class="play_bar">
            <div class="playing_song_info">
              <a href="javascript:;" :title="playsong.name">{{playsong.name}}</a>
              -
              <a href="javascript:;" :title="playsong.singer">{{playsong.singer}}</a>
            </div>
            <div class="playing_song_time">{{currentT}} / {{AllT}}</div>
            <div class="playing_song_progress" @click="handleTick">
              <div class="progress_inner">
                <div id="all_length" class="progress_load_length"></div>
                <!-- 当前已经播放长度 -->
                <div id="b" class="progress_playing_length">
                  <i id="c" @mousedown="handleStartMove" @mousemove="handleMove" @mouseup="handleEndMove" class="control_icon play_bar_dot"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- 声音控制区域 -->
          <div ref="voff" class="playing_song_progress player_voice" @click="handleTickOfVoice">
            <a href="javascript:;" class="control_icon close_voice_icon has_voice" :class="{'no_voice':isForbidden}" @click="closeVoice" title="关闭声音[M]"></a>
            <div class="progress_inner" title="调节音量 [增大alt+↑][减小alt+↓]">
              <div class="progress_load_length"></div>
              <!-- 当前声音长度 -->
              <div class="progress_playing_length" ref="vlnow" style="width: 50%">
                <i class="control_icon play_bar_dot" @mousedown="handleStartVoiceMove" @mousemove="handleVoiceMove" @mouseup="handleVoiceMoveEnd"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="player_cover_mask"></div>
      <audio @canplay="sos" @timeupdate="updateSomething" @ended="playingover" autoplay="false" id="audio" :src="playurl">

      </audio>
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
           playurl:'',
           playsong:null,
           playsongindex:-1,
           isplaying:false,
           isMounted:false,
           max:0,
           percentage:0,
           alltime:0,
           currentTime:0,
           progressInit:false,
           percentageOfVoice:'50%',
           //声音大小默认为0.5
           volume:0.5,
           isForbidden:false,
           progressVoiceInit:false,
         }
       },
       computed:{
         songlist(){
           let arr = [], obj = {};
           // 对象数组去重 防止试听列表中出现重复的歌曲
           arr = this.$store.getters.ListSong.reduce((item,next) => {
             obj[next.name] ? "" : obj[next.name]=true && item.push(next);
             return item;
           },[]);
           return arr;
         },
         currentT(){
           return this.formatTime(this.currentTime);
         },
         AllT(){
           return this.formatTime(this.alltime);
         }
       },
       methods:{
         play(item,index){
           let a = document.getElementById('audio');
           if(item.singer == "周杰伦"){
             this.$message({
               type:'info',
               message:'很遗憾！周董的歌无法获取到播放源地址，换一首试试 ┑(￣Д ￣)┍',
               duration:4000
             });
           }else{
             this.playurl = item.url;
             this.playsong = item;
             if(a.paused){
               // 如果当前歌曲处于暂停 并且点击其他歌曲播放按钮 那么将当前单击播放按钮改变样式并且播放
               this.isplaying=true;
               this.playsongindex = index;
               a.play();
             }else if(!a.paused && this.playsongindex!=index){
               // 如果歌曲处于播放状态 单击其他歌曲 那么同上
               this.isplaying = true;
               this.playsongindex = index;
               a.play();
             }else{
               // 否则停止播放
               this.isplaying = false;
               a.pause();
             }
           }
         },
         controlplay(){
           let audio = document.getElementById('audio');
           if(audio.paused){
             audio.play();
             this.isplaying = true;
           }else{
             audio.pause();
             this.isplaying = false;
           }
         },
         playprevious(){
           let nowplayqueue = this.songlist;
           let len = nowplayqueue.length;
           // 更新播放歌曲url
           this.playurl = this.playsongindex == 0 ? nowplayqueue[len-1].url : nowplayqueue[this.playsongindex-1].url;
           // 更新播放歌曲的index
           this.playsongindex = !!this.playsongindex ? this.playsongindex-1 : len-1;
           //更播放条处 歌曲信息
           this.playsong = nowplayqueue[this.playsongindex];
           this.isplaying = true;
         },
         playnext(){
           let nowplayqueue = this.songlist;
           let len = nowplayqueue.length;
           this.playurl = this.playsongindex ==len-1 ? nowplayqueue[0].url : nowplayqueue[this.playsongindex+1].url;
           this.playsongindex = this.playsongindex==len-1 ? 0 : this.playsongindex+1;
           //更新播放条区域 当前播放歌曲信息
           this.playsong = nowplayqueue[this.playsongindex];
           this.isplaying = true;
         },
         formatTime(time){
           let m = Math.floor(time/60);
           let s = Math.floor((time - m*60));
           if(m < 10)
             m = `0${m}`;
           if(s<10)
             s = `0${s}`;
           return `${m}:${s}`;
         },
         updateProgress(x){
           let a = this.$refs.k,
             rela = this.$refs.rela,
             b = document.getElementById('b'),
             media = document.getElementById('audio'),
             self = this;
           let marleft = parseInt(self.myWindow.getComputedStyle(rela).marginLeft,10)
           self.max = a.clientWidth;
           let offsetleft = a.offsetLeft+marleft;
           let position = x - offsetleft > self.max ? self.max : x-offsetleft;
           self.percentage = Number(position/self.max * 100).toFixed() + '%';
           if(position < 0){
               self.percentage = 0;
               position = 0;
           }
           b.style.width = self.percentage;
           self.currentTime = media.currentTime = media.duration * Number(position/self.max);
         },
         sos(){
           let media = document.getElementById('audio');
           this.alltime = media.duration;
           media.volume = 0.5;
         },
         //随着歌曲播放更新滚动条
         updateSomething(){
           let self = this,
             b = document.getElementById('b'),
             media = document.getElementById('audio');
           self.currentTime = media.currentTime;
           let a = self.currentTime/self.alltime;
           b.style.width = (a*100).toFixed()+'%';
         },
         //播放结束 自动下一首
         playingover(){
           this.playnext();
         },
         handleTick(e){
           this.updateProgress(e.pageX);
         },
         handleStartMove(e){
           this.progressInit = true;
           this.updateProgress(e.pageX);
         },
         handleMove(e){
           if(this.progressInit){
             this.updateProgress(e.pageX);
           }
         },
         handleEndMove(e){
           if(this.progressInit){
             this.progressInit = false;
             this.updateProgress(e.pageX);
           }
         },
         handleStartVoiceMove(e){
           this.progressVoiceInit = true;
           this.updateVoiceProgress(e.pageX);
         },
         handleVoiceMove(e){
           if(this.progressVoiceInit){
             this.updateVoiceProgress(e.pageX);
           }
         },
         handleVoiceMoveEnd(e){
           if(this.progressVoiceInit){
             this.progressVoiceInit = false;
             this.updateVoiceProgress(e.pageX);
           }
         },
         //音量调节滚动条
         updateVoiceProgress(x){
           let off = this.$refs.voff,
             rela = this.$refs.rela,
             self = this,
             vlnow = this.$refs.vlnow,
             media = document.getElementById('audio');
           let offsetleft = off.offsetLeft;
           let marleft = parseInt(self.myWindow.getComputedStyle(rela).marginLeft,10) + offsetleft;
           let position = x - marleft >= 80 ? 80 : x-marleft;
           self.percentageOfVoice = Number(position/80 * 100).toFixed()+'%';
           if(position<0){
             self.percentageOfVoice = 0;
             position = 0;
           }
           vlnow.style.width = self.percentageOfVoice;
           media.volume = Number(position/80).toFixed(2);
         },
         handleTickOfVoice(e){
           this.updateVoiceProgress(e.pageX);
         },
         closeVoice(e){
           this.isForbidden = !this.isForbidden;
           document.getElementById('audio').muted = !document.getElementById('audio').muted;
           //停止事件冒泡 否则dot元素将会回到初始值 即声音控制条降为0px
           e.stopPropagation();
         }
       },
       created() {
         let self=this;
         let a = document.getElementById('k'),
           body = document.documentElement || document.body;
          // 将setTimeout改成setInterval 有标题滚动效果
          // let token=setTimeout(function () {
          //   document.title = self.$store.getters.NowPlay.song + "-" + self.$store.getters.NowPlay.singer + "..." + "正在播放" + " ";
          //   var text = document.title;
          //   document.title = text.substring(1,text.length) + text.substring(0,1);
          // },700);
          body.addEventListener('mousemove',function (e) {
            if(self.progressInit){
              self.updateProgress(e.pageX);
            }
            if(self.progressVoiceInit){
              self.updateVoiceProgress(e.pageX);
            }
          });
          body.addEventListener('mouseup',function (e) {
            if(self.progressInit){
              self.progressInit = false;
              self.updateProgress(e.pageX);
            }
            if(self.progressVoiceInit){
              self.progressVoiceInit = false;
              self.updateVoiceProgress(e.pageX);
            }
          })
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
