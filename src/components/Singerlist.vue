<template>
    <div>
      <div class="singerlist_bg_wrap">
        <div class="index_inner">
          <div class="singer_follow_title"><span class="singer_follow_text">我关注的歌手</span></div>
          <div class="singer_follow_slide">
            <ul class="singer_slide_list">
              <li class="singer_list_item" v-for="singer in singers" :key="singer.id">
                <a href="javascript:;" class="singer_list_item_link" :title="singer.name" @click="singerIndex(singer.name)">
                  <img class="singer_img" :src="singer.photo"/>
                  <i class="singer_img_border"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="main">
        <!--<div> 过滤选项 暂时不打算开发</div>-->
        <div class="all_singer_wrapper" v-if="Singers">
          <h1 style="color: #999;font-size: 26px;text-align: center;margin-top: 50px">第一页将一共有{{Singers.length}}位歌手，已经获取QQ音乐数据请等待后续完善</h1>
        </div>
      </div>
    </div>
</template>

<script>
  import {getSingerList} from "../api/recommend";

  export default {
      name: "Singer",
      data(){
        return {
          Singers:null
        }
      },
      computed:{
        singers(){
          return this.$store.state.Singers;
        },
      },
      methods:{
        singerIndex(singerName){
          this.$router.push({name:"Singer",params:{sn:singerName}});
        }
      },
      created() {
        var self = this;
        document.title="歌手列表 - Music-千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！";
        getSingerList().then(data=>{
          let lists = data.data.singerList.data.singerlist;
        //   获取所有歌手
          self.Singers = lists;
        })
      }
    }
</script>

<style>
  @import "../assets/css/SingerList.css";
</style>
