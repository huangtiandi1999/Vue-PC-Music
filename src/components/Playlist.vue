<template>
    <div v-if="PlayLists">
      <h1 style="color: #999;font-size: 26px;text-align: center;margin-top: 50px">歌单数据已经获取，请等待后续完善</h1>
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
        getDiscList().then(res=>{
          let lists = res.data.list;
          self.PlayLists = lists;
          console.log(res.data.list.length);
        })
      }
    }
</script>

<style scoped>

</style>
