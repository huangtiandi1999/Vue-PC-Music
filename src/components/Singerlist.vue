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
        <!-- 过滤选项 -->
        <div class="singer_filter_wrap">
          <!-- 地区 -->
          <div class="singer_filter_tag area_tag">
            <a v-for="(area,index) of filterTagsOfArea" href="javascript:;"
               class="singer_tag_item" :class="{'tag_item_all':index==0,'tag_item_selected':index==currentTagOfArea}">{{area}}</a>
          </div>
          <!-- 性别 -->
          <div class="singer_filter_tag area_sex">
            <a v-for="(sex,index) of filterTagsOfSex" href="javascript:;"
               class="singer_tag_item" :class="{'tag_item_all':index==0,'tag_item_selected':index==currentTagOfSex}">{{sex}}</a>
          </div>
        </div>
        <div class="all_singer_wrapper" v-if="Singers">
          <!-- 与QQ音乐一致 前十歌手显示大头像 -->
          <div class="topten_singer_wrap">
            <ul class="topten_singer_list">
              <li class="topten_singer_list_item" v-for="(item,index) of topTenSingers">
                <div class="topten_singer_item_inner">
                  <a href="javascript:;" @click="handleToSingerIndex(item.singer_mid)" class="singer_list_apic">
                    <img class="singer_list_pic" :src="item.singer_pic"/>
                  </a>
                  <h3 class="singer_list_title">
                    <a href="javascript:;">{{item.singer_name}}</a>
                  </h3>
                </div>
              </li>
            </ul>
          </div>
          <!-- 其余歌手以姓名展出 -->
          <ul class="singer_list_ul">
            <li class="singer_list_text_item" v-for="(item,index) of Singerlists">
              <a class="singer_list_text_link" @click="handleToSingerIndex(item.singer_mid)" href="javascript:;">{{item.singer_name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {getSingerList,getSingerDetailsInfo} from "../api/recommend";

  export default {
      name: "Singer",
      data(){
        return {
          Singers:null,
          filterTagsOfArea:['全部','内地','港台','欧美','日本','韩国','其他'],
          currentTagOfArea:0,
          filterTagsOfSex:['全部','男','女','组合'],
          currentTagOfSex:0
        }
      },
      computed:{
        //关注的歌手
        singers(){
          return this.$store.state.Singers;
        },
        //前十的歌手
        topTenSingers(){
          //将图片扩展名修改为jpg
          return this.Singers.map(singer => {
            singer.singer_pic=singer.singer_pic.replace(/\.webp/,'.jpg');
            return singer;
          }).slice(0,10);
        },
        //非前十歌手
        Singerlists(){
          return this.Singers.slice(10);
        }
      },
      methods:{
        singerIndex(singerName){
          this.$router.push({name:"Singer",params:{sn:singerName}});
        },
        handleToSingerIndex(singermid){
          // 由于之前进入歌手主页是从本地data.json文件读取数据，而现在为了展示所有的数据 必须从qq音乐接口读取数据
          //  或者直接下载qq音乐返回的json文件到本地(这种方式可以保证数据一直存在很稳定，但不会主动更新数据)
          //  我们采用第一种的方式 但是之前的方式不管用了 我们只能现在这里把数据封装好然后再那边获取
          // 那边需要的数据结构是 singerInformation这个对象 然后它有两个属性 music_inf,singer_inf
          //  这种传递数据的方式会存在一个 bug 进入歌手主页后如果刷新页面 将会出现singerInformation为空的状况 现阶段最好的解决方案是存进sessionStorage
          let singer_pic = this.Singers.find(item=>item.singer_mid==singermid).singer_pic.replace(/150x150/,"300x300");
          getSingerDetailsInfo(singermid).then(data=>{
            //构造 songName属性
            let ds = data.data.singer.data;
            //个人信息
            let singer_info = ds.singer_info;
            //个人介绍
            let singer_brief = ds.singer_brief;
            //暂时无法获取歌曲封面图片 后续应该可以
            let songlist = ds.songlist.map(song =>{
              let ret = {
                name:song.name,
                album:song.album.name,
                photo:'',
                songmid:song.mid
              };
              return ret
            });
            let music_inf={
              singerName:singer_info.name,
              songName:songlist,
              //专辑列表可以使用同样的接口获取 此处就算了
              album:null
            }
            let singer_inf={
              name:singer_info.name,
              fans:singer_info.fans,
              introduce:singer_brief,
              photo1:singer_pic
            }
            //先把信息提取出
            let obj={
              music_inf,
              singer_inf
            };
            this.myWindow.sessionStorage.setItem('singer',JSON.stringify(obj));
            //将构造好的对象通过路由传递
            this.$router.push({
              path:'/Singer',
              query:{
                singer:singer_info.name
              }
            })
          })
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
