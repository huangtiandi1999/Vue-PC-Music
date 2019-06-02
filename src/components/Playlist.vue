<template>
    <div class="main" v-if="PlayLists">
      <!-- 标签筛选 -->
      <div class="mod_filter_wrap">
        <div class="mod_filter_tag_item">
          <h3 class="filter_tag_name">语种</h3>
          <i></i>
          <ul class="filter_box">
            <li class="filter_box_item" v-for="index of 6">
              <a href="javascript:;" class="filter_tag_link">韩语</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 展示所有歌单 -->
      <div>

      </div>
    </div>
</template>

<script>
  import {getDiscList} from '../api/recommend'
    export default {
      name: "Playlist",
      data(){
        return {
          PlayLists:null,
        }
      },
      created() {
        let self = this;
        // 页面加载时  默认传递categoryid为 10000000 表示热门歌单 没有在页面中展示热门歌单的过滤选项 sortid为3表示最热歌单
        getDiscList(10000000,3).then(res=>{
          let lists = res.data.list;
          self.PlayLists = lists;
          console.log(res.data.list.length);
        })
      }
    }
</script>

<style>
  @import '../assets/css/Playlist.css';
</style>
