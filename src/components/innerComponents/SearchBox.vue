<template>
    <div class="search_wrap">
      <div class="search_input_wrapper">
        <input type="text"
               class="search_input"
               aria-label="请输入搜索内容" @focus="isDrop=!isDrop"
               @blur="isDrop=!isDrop"
               v-model="keyword" placeholder="搜索音乐、MV、歌单、用户">
        <button class="search_btn"><i class="search_icon music_icon"></i></button>
      </div>
      <!-- 搜索列表 -->
      <div class="search_list_wrapper">
        <!-- 推荐搜索区域 -->
        <div class="recommend_area" :class="{'drop':isDrop}">
          <!-- 热门搜索区域 -->
          <div class="search_hot">
            <dl class="search_hot_list">
              <dt class="search_hot_title">热门搜素</dt>
              <dd>
                <a href="javascript:;" v-for="item in HotMusic" class="search_hot_link">
                  <span class="search_hot_index">{{item.index}}</span>
                  <span class="search_hot_name">{{item.songName}}</span>
                  <span class="search_hot_num">{{item.Number}}</span>
                </a>
              </dd>
            </dl>
          </div>
          <!-- 搜索历史 -->
          <div class="search_history">
            <dl class="search_history_list">
              <dt class="search_history_title">搜索历史<a href="javascript:;" class="search_history_clear"><i class="clear_icon music_icon"></i></a></dt>
              <dd></dd>
            </dl>
          </div>
        </div>
        <!-- 搜索结果列表 -->
        <div class="result_area" :class="{'drop':isDroped}">
          <!-- 单曲部分 -->
          <div class="search_result_item">
            <h4 class="search_result_item_title"><i class="music_icon song_icon ab_icon"></i>单曲</h4>
            <ul class="search_result_item_list">
              <li v-for="(item,index) in FilterMusic.songName" :key="index">
                <a class="search_result_link" href="javascript:;">{{item}}</a>
              </li>
            </ul>
          </div>
          <!-- 歌手部分 -->
          <div class="search_result_item">
            <h4 class="search_result_item_title"><i class="music_icon singer_icon ab_icon"></i>歌手</h4>
            <ul class="search_result_item_list">
              <li v-for="(item,index) in FilterMusic.singerName" :key="index">
                <a class="search_result_link" href="javascript:;">{{item}}</a>
              </li>
            </ul>
          </div>
          <!-- 专辑部分 -->
          <div class="search_result_item">
            <h4 class="search_result_item_title"><i class="music_icon album_icon ab_icon"></i>专辑</h4>
            <ul class="search_result_item_list">
              <li v-for="(item,index) in FilterMusic.Albums" :key="index">
                <a class="search_result_link" href="javascript:;">{{item}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "SearchBox",
      data:function () {
        return {
          isDrop:false,
          keyword:'',
          Musics:[],
          // 搜索框下展示的数据
          HotMusic:[],
          FilterMusic:{singerName:[],songName:[],Albums:[]}
        }
      },
      computed:{
        isDroped:function () {
          return this.isDrop && !!(this.keyword.trim())
        }
      },
      watch:{
        keyword:function (key) {
          console.log(key);
          var len=this.Musics.length;
          if(!!key.trim()){
            for (var item of this.Musics){
              // 如果关键字等于歌手名字
              if(item.singerName==key){
                this.FilterMusic.singerName.push(item.singerName);
                // 取得该歌手前五首歌和 前两张专辑展示
                this.FilterMusic.songName=item.songName.slice(0,5);
                this.FilterMusic.Albums=item.Albums.slice(0,2);
              }else{

              }
            }
          }
        }
      },
      mounted() {
        // 获取本地json文件的数据
        axios.get("../../../static/data.json")
          .then((response)=>{
            // 将所有数据保存到Music数组中
            this.Musics=response.data.Music;
            this.HotMusic=response.data.Recommend;
            console.log(this.Music);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    }
</script>

<style scoped>

</style>
