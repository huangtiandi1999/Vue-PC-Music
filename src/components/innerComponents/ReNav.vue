<template>
    <ul class="Re_Nav">
      <li class="re_nav_item" v-for="(item,index) in items">
        <a href="javascript:;"
           @click="ChangeColor(index,item.name)"
           class="re_nav_item_link" v-bind:class="{'re_link_current':index==currentIndex}">{{item.title}}</a>
      </li>
    </ul>
</template>

<script>
    export default {
      name: "ReNav",
      data:function () {
        return {
          currentIndex:0,
          items:[
            {title:'首页',name: 'Home'},
            {title:'歌手',name:'Singerlist'},
            {title:'专辑',name:''},
            {title:'排行榜',name:''},
            {title:'分类歌单',name:'Playlist'},
            {title:'电台',name:''},
            {title:'MV',name:''},
            {title:'数字专辑',name:''},
            {title:'票务',name:''}
          ]
        }
      },
      methods:{
        ChangeColor(index,name){
          // 如果单击当前a元素 则添加样式curren_link
          this.currentIndex=index;
          this.$router.replace({name:name});
        }
      }
    }
</script>

<style scoped>

</style>
