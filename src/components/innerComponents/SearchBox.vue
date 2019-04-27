<template>
    <div class="search_wrap">
      <div class="search_input_wrapper">
        <input type="text"
               class="search_input"
               aria-label="请输入搜索内容" @focus="isDrop=!isDrop"
               @blur="isDrop=!isDrop"
               v-model="keywords" placeholder="搜索音乐、MV、歌单、用户">
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
                <a class="search_result_link" href="javascript:;">
                  <span class="search_result_name" v-html="insertKeywordsStyle(item.song,keywords)"></span>-

                  <span class="search_result_singername" v-html="insertKeywordsStyle(item.singer,keywords)"></span>
                </a>
              </li>
            </ul>
          </div>
          <!-- 歌手部分 -->
          <div class="search_result_item">
            <h4 class="search_result_item_title"><i class="music_icon singer_icon ab_icon"></i>歌手</h4>
            <ul class="search_result_item_list">
              <li v-for="(item,index) in FilterMusic.singerName" :key="index">
                <a class="search_result_link" href="javascript:;" @click="intoSingerIndex(item)" v-html="insertKeywordsStyle(item,keywords)"></a>
              </li>
            </ul>
          </div>
          <!-- 专辑部分 -->
          <div class="search_result_item">
            <h4 class="search_result_item_title"><i class="music_icon album_icon ab_icon"></i>专辑</h4>
            <ul class="search_result_item_list">
              <li v-for="(item,index) in FilterMusic.Albums" :key="index">
                <a class="search_result_link" href="javascript:;">
                  <span class="search_result_name" v-html="insertKeywordsStyle(item.album,keywords)"></span>-

                  <span class="search_result_singername" v-html="insertKeywordsStyle(item.singer,keywords)"></span>
                </a>
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
          _self:this,
          isDrop:false,
          keywords:'',
          Musics:[],
          // 搜索框下展示的数据
          HotMusic:[],
          FilterMusic:{singerName:new Set(),songName:[],Albums:[]}
        }
      },
      computed:{
        isDroped:function () {
          return this.isDrop && !!(this.keywords.trim())
        }
      },
      methods:{
        clearMusic(){
          this.FilterMusic.songName.splice(0,5);
          this.FilterMusic.singerName.clear();
          this.FilterMusic.Albums.splice(0,2);
        },
        ReduceArray(arr){
          var obj={},
            result=[];
          result=arr.reduce(function (item,next) {
            obj[next.singerName] ? "" : obj[next.singerName]=true && item.push(next);
            return item;
          },[]);
          return result;
        },
        intoSingerIndex(name){
          this.$router.push({name:'Singer',params:{sn:name}});
        },
        // 给关键字实时添加高亮显示
        insertKeywordsStyle(text,keyword){
          text = text +'';
          if(!!~text.indexOf(keyword) && !!keyword){
            return text.replace(keyword,'<span class="search_result__keywords">'+keyword+'</span>');
          }else{
            return text;
          }
        }
      },
      watch:{
        keywords:function (key) {
          let _self=this;
          var len=_self.Musics.length;
          if(!!key.trim()){
            for (var item of _self.Musics){
              // 如果关键字等于歌手名字
              if(item.singerName==key){
                _self.clearMusic();
                _self.FilterMusic.singerName.add(item.singerName);
                // 取得该歌手前五首歌和 前两张专辑展示
                item.songName.slice(0,5).forEach(
                  value => _self.FilterMusic.songName.push({"song":value.name,"singer":key})
                );
                item.Albums.slice(0,2).forEach(
                  value => _self.FilterMusic.Albums.push({"singer":key,"album":value})
                );
                break;
              }else {
              //  歌名模糊搜索
                for(let m of item.songName){
                  if(!!~m.name.indexOf(key)){
                    _self.FilterMusic.songName.push({"song":m,"singer":item.singerName});
                    // 数组去重 根据reduce函数的参数的特点 此时的item表示arguments[0]且初始值为[] next表示数组的第一项
                    _self.FilterMusic.songName=_self.ReduceArray(_self.FilterMusic.songName);
                  }
                }
              //  专辑模糊搜索
                for(let n of item.Albums){
                 if(!!~n.indexOf(key)){
                   _self.FilterMusic.Albums.push({"singer":item.singerName,"album":n});
                   _self.FilterMusic.Albums=_self.ReduceArray(_self.FilterMusic.Albums);
                 }
                }
              }
            }
          }else {
            // 一旦输入框为空则清空所有搜索内容
            setTimeout(_self.clearMusic,500);
          }
        }
      },
      mounted() {
        // 获取本地json文件的数据
        let _self=this;
        axios.get("../../../static/data.json")
          .then((response)=>{
            // 将所有数据保存到Music数组中
            _self.Musics=response.data.Music;
            _self.HotMusic=response.data.Recommend;
            console.log(_self.Music);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    }

</script>

<style scoped>

</style>
