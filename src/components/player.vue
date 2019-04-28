<template>
    <div>
      {{songName}}
      {{singerName}}
    </div>
</template>

<script>
    export default {
      name: "player",
      data(){
        return {
          songName:this.$route.query.song,
          singerName:this.$route.query.singer
        }
      },
      //设置导航守卫
      beforeRouteEnter(to,from,next){
        //用回调方式获取该组件实例
        next(vm => {
          vm.$store.dispatch('hideHeader');
        })
      },
      beforeRouteLeave(to,from,next){
        this.$store.dispatch('showHeader')
        next();
      }
    }
</script>

<style scoped>

</style>
