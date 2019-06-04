<template>
    <div class="main" v-if="PlayLists">
      <!-- 标签筛选 -->
      <div class="mod_filter_wrap">
        <div class="mod_filter_tag_item" v-for="(category,index) of Category">
          <h3 class="filter_tag_name">{{category.name}}</h3>
          <i></i>
          <ul class="filter_box">
            <li class="filter_box_item" v-for="item of category.sort.slice(0,6)">
              <a href="javascript:;"
                 :class="{'filter_tag_selected':item.categoryId==CurrentBigFilter}"
                 @click="FilterByCategory(item.categoryId)"
                 class="filter_tag_link" :data-id="item.categoryId">{{item.categoryName}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 展示所有歌单 -->
      <div class="mod_all_lists">
        <div class="mod_all_head">
          <h2 class="mod_all_title">全部歌单</h2>
          <div class="mod_all_switch">
            <a href="javascript:;" @click="FilterListBySortId(5)" class="switch_item switch_item__left" :class="{'switch_item__selected':currentFilter==5}">推荐</a>
            <a href="javascript:;" @click="FilterListBySortId(2)" class="switch_item switch_item__right" :class="{'switch_item__selected':currentFilter==2}">最新</a>
          </div>
        </div>
        <div class="mod_all_details" v-if="PlayLists">
          <ul class="mod_lists_ul">
            <li class="mod_lists_ul_li" v-for="(list,index) of PlayLists">
                <div class="mod_lists_li_box">
                  <div class="mod_lists_li_top">
                      <a href="javascript:;" @click="playThisLists(list.dissid)">
                        <img :src=list.imgPath class="mod_lists_li_img mod_lists_scale"/>
                        <i class="music_play_btn hot_play_btn"></i>
                      </a>
                    </div>
                  <h4 class="mod_lists_title">
                    <span class="mod_lists_text"><a href="javascript:;">{{list.title}}</a></span>
                  </h4>
                  <!-- 作者 -->
                  <div class="mod_lists_author"><a href="javascript:;">{{list.author}}</a></div>
                  <div class="mod_lists_num">播放量：{{list.num}}</div>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {getDiscList,getListCategory,getSongListInfo} from '../api/recommend'
  import {getRightStructure,getListsInfoStructure} from "../api/methods";

  export default {
      name: "Playlist",
      data(){
        return {
          PlayLists:null,
          Category:[],
          currentFilter:5,
          // 记录当前歌单分类的大前提 默认为热门
          CurrentBigFilter:10000000,
        }
      },
      methods:{
        playThisLists(dissid){
          let self = this;
          //同样的获取该歌单中所有的歌曲
          getSongListInfo(dissid).then(data=>{
            let songlist = data.data.cdlist[0].songlist;
            let a = getRightStructure(songlist);
            self.$store.dispatch('EvalSongListForNew',a);
            this.$router.push({name:'player'});
          })
        },
        FilterListBySortId(sortid){
          let self = this;
          this.currentFilter=sortid;
          getDiscList(this.CurrentBigFilter,sortid).then(res=>{
            let lists = res.data.list;
            let arr = getListsInfoStructure(lists);
            self.PlayLists = arr;
          })
        },
        FilterByCategory(categoryId){
          let self = this;
          //修改当前类别
          self.CurrentBigFilter = categoryId;
          getDiscList(categoryId,this.currentFilter).then(res=>{
            let lists = res.data.list;
            let arr = getListsInfoStructure(lists);
            self.PlayLists = arr;
          })
        }
      },
      created() {
        let self = this;
        // 页面加载时  默认传递categoryid为 10000000 表示热门歌单 没有在页面中展示热门歌单的过滤选项 sortid为3表示最热歌单
        getDiscList(10000000,3).then(res=>{
          let lists = res.data.list;
          // 构造数据结构  首先从歌单直接进入播放页  需要的结构是 dissid 歌单封面img 还有歌单标题 title 以及播放量 number
          let arr = getListsInfoStructure(lists);
          self.PlayLists = arr;
        });
        getListCategory().then(res=>{
          // 构造数据结构
          let category = res.data.data.categories;
          let arr = category.map(c=>{
            let name = c.categoryGroupName;
            let sort = c.items;
            return {name,sort};
          })
          self.Category = arr.slice(1);
        })
        document.title="分类歌单 - Music-千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！";
      },

    }
</script>

<style>
  @import '../assets/css/Playlist.css';

  .component-fade-enter-active{
    transition: opacity .3s ease;
  }
  .component-fade-enter,.component-fade-leave-to{
    opacity: 0;
  }
</style>
