<template>
    <div class="mod_index starting_music_wrap">
      <div class="index_inner starting_music-inner">
        <div class="index_music_title">
          <h2 class="head_title starting_music_head_title">新歌首发</h2>
        </div>
        <a href="javascript:;" class="play_all_btn"><i class="music_icon play_all_icon"></i>播放全部</a>
        <div class="index_music_tab">
          <a href="javascript:;" v-for="(item,index) of Lists" @click="toggleComponent(index,item.tabUrl)" class="index_music_tab_item" :class="{'current_item':index==CurrentIndex}">{{item.tabName}}</a>
        </div>
        <!-- 组件的过渡 -->
        <transition name="component-fade" mode="out-in">
          <component :is="CurrentComponent"></component>
        </transition>
      </div>
    </div>
</template>

<script>
  import Stone from './StartingComponents/Stone'
    export default {
      name: "StartingMusic",
      components:{
        Stone,
      },
      data:function () {
        return {
          CurrentIndex:0,
          CurrentComponent:'Stone',
          Lists:[
            {tabName:'最新',tabUrl:'Stone'},
            {tabName:'内地',tabUrl:'Sttwo'},
            {tabName:'港台',tabUrl:'Stthree'},
            {tabName:'欧美',tabUrl:'Stfour'},
            {tabName:'韩国',tabUrl:'Stfive'},
            {tabName:'日本',tabUrl:'Stsix'}
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

<style scoped>

</style>
