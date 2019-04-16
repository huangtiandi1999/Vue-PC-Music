<template>
    <ul class="Re_Nav">
      <li class="re_nav_item" v-for="(item,index) in items">
        <a href="javascript:;"
           @click="ChangeColor(index)"
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
            {title:'首页'},
            {title:'歌手'},
            {title:'专辑'},
            {title:'排行榜'},
            {title:'分类歌单'},
            {title:'电台'},
            {title:'MV'},
            {title:'数字专辑'},
            {title:'票务'}
          ]
        }
      },
      methods:{
        ChangeColor(index){
          // 如果单击当前a元素 则添加样式curren_link
          this.currentIndex=index;
        }
      }
    }
</script>

<style scoped>

</style>
