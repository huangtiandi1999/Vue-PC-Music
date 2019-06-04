<template>
    <div class="hot_music_slide">
      <el-carousel :autoplay="false" height="280px" arrow="always">
        <el-carousel-item>
          <li class="hot_music_slide_item" v-for="pop in RecommendList.slice(0,5)">
            <div class="hot_music_item_box">
              <div class="hot_music_item_top">
                <a href="javascript:;" @click="playThisLists(pop.dissid)">
                  <img :src=pop.imgPath class="hot_music_item_img music_play_img"/>
                  <i class="covers"></i>
                  <i class="music_play_btn hot_play_btn"></i>
                </a>
              </div>
              <h4 class="hot_music_item_title">
                <span class="hot_music_text"><a href="javascript:;">{{pop.title}}</a></span>
              </h4>
              <div class="hot_music_item_bottom">播放量：{{pop.number}}</div>
            </div>
          </li>
        </el-carousel-item>
        <el-carousel-item>
          <li class="hot_music_slide_item" v-for="pop in RecommendList.slice(5,10)">
            <div class="hot_music_item_box">
              <div class="hot_music_item_top">
                <a href="javascript:;">
                  <img :src=pop.imgPath class="hot_music_item_img music_play_img"/>
                  <i class="covers"></i>
                  <i class="music_play_btn hot_play_btn"></i>
                </a>
              </div>
              <h4 class="hot_music_item_title">
                <span class="hot_music_text"><a href="javascript:;">{{pop.title}}</a></span>
              </h4>
              <div class="hot_music_item_bottom">播放量：{{pop.number}}</div>
            </div>
          </li>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
  import {getSongListInfo} from "../../../../api/recommend";
  import {getRightStructure} from "../../../../api/methods";

  export default {
      name: "Reone",
      computed:{
        RecommendList(){
          // 获取状态管理state驱动源
          return this.$store.state.Lists.Recommend;
        }
      },
      data:function(){
        return{
        }
      },
      methods:{
        playThisLists(dissid){
          let self = this;
          // 此处我将通过 dissid从qq音乐接口获取到该id对应歌单的所有数据 并且拼接歌单中所有歌曲的播放源
          // 需要构造的信息info的数组  info的数据结构需要 ablum,name,photo,singer,songmid,url这些属性
          getSongListInfo(dissid).then(data=>{
            let songlist = data.data.cdlist[0].songlist;
            let a = getRightStructure(songlist);
            self.$store.dispatch('EvalSongListForNew',a);
            this.$router.push({name:'player'});
            });
        }
      }
    }
</script>

<style>

</style>
