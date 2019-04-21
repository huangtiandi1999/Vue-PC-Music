<template>
    <div class="hot_music_wrap mod_index">
      <div class="hot_music_inner index_inner">
        <div class="hot_music_head index_music_title">
          <h2 class="hot_music_head_title head_title">歌单推荐</h2>
        </div>
        <div class="hot_music_tab index_music_tab">
          <a href="javascript:;" v-for="(item,index) of Lists" class="index_music_tab_item" @click="toggleComponent(index,item.tabUrl)" :class="{'current_item':index==CurrentIndex}">{{item.tabName}}</a>
        </div>
        <!-- 组件的过渡 -->
        <transition name="component-fade" mode="out-in">
          <component :is="CurrentComponent"></component>
        </transition>
      </div>
    </div>
</template>

<script>
  import Reone from './CarouselComponent/RecommendCarousel/Reone'
  import Retwo from './CarouselComponent/RecommendCarousel/Retwo'
    export default {
      name: "HotMusicSheet",
      components:{
        Reone,
        Retwo,
      },
      data:function () {
        return {
          CurrentIndex:0,
          CurrentComponent:'Reone',
          Lists:[
            {tabName:'为你推荐',tabUrl:'Reone'},
            {tabName:'官方歌单',tabUrl:'Retwo'},
            {tabName:'情歌',tabUrl:'Rethree'},
            {tabName:'网络歌曲',tabUrl:'Refour'},
            {tabName:'经典',tabUrl:'Refive'},
            {tabName:'KTV热歌',tabUrl:'Resix'}
          ]
        }
      },
      methods:{
        toggleComponent(index,name){
          this.CurrentIndex=index;
          this.CurrentComponent=name;
        }
      }
    }
</script>

<style>
  .component-fade-enter-active{
    transition: opacity .3s ease;
  }
  .component-fade-enter,.component-fade-leave-to{
    opacity: 0;
  }
</style>
