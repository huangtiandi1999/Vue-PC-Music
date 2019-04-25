<template>
    <div class="singer_main">
      <!-- 歌手介绍区域 父子组件通信-->
      <SingerInfo v-if="singerInformation" :Info="singerInformation"></SingerInfo>
      <!-- 歌手作品区域 -->
      <div class="singer_wrap">
        <div class="singer_list_part">

        </div>
        <div>

        </div>
      </div>
    </div>
</template>

<script>
  import SingerInfo from './SingerComponents/SingerInfo'
    export default {
      name: "SingerIndex",
      components:{
        SingerInfo,
      },
      data(){
        return{
          fullscreenloading:false,
          singerInformation:null
        }
      },
      created() {
        this.FilterSingerData();
      },
      watch:{
        '$route':'FilterSingerData'
      },
      methods:{
        FilterSingerData(){
          var self=this;
          const loading=this.$loading({
            text:'Loading...',
            background:'rgba(0,0,0,0.7)'
          })
          var name=self.$route.params.sn;
          var promise=new Promise((resolve, reject) => {
            try {
              setTimeout(function () {
                var music_inf=self.$store.state.Music.find(music => music.singerName == name)
                var singer_inf=self.$store.state.Singers.find(singer => singer.name==name)
                self.singerInformation={
                  music_inf,
                  singer_inf
                }
                loading.close();
                resolve("请求完成");
              },1000);
            }
            catch (e) {
              reject(e);
            }
          })
            .then(data=>{
              console.log(data);
            },err=>{
              console.log(err);
            })
        }
      }
    }
</script>

<style>
  @import "../assets/css/Singer.css";
</style>
