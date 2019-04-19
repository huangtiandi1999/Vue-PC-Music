<template>
    <div class="hot_music_slide">
      <el-carousel :autoplay="false" height="280px" arrow="always">
        <el-carousel-item>
          <li class="hot_music_slide_item" v-for="pop in RecommendList.slice(0,5)">
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
      mounted() {

      }
    }
</script>

<style>

</style>
