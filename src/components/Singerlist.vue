<template>
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
</template>

<script>
    export default {
      name: "Singer",
      computed:{
        singers(){
          return this.$store.state.Singers;
        }
      },
      methods:{
        singerIndex(singerName){
          this.$router.push({name:"Singer",params:{sn:singerName}});
        }
      },
      created() {
        document.title="歌手列表 - Music-千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！"
      }
    }
</script>

<style>
  @import "../assets/css/SingerList.css";
</style>
