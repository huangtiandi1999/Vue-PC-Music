<template>
    <div>
      {{singerName}}
      {{songName}}
    </div>
</template>

<script>
    export default {
      name: "player",
      data(){
        return {
          singerName:this.$route.params.singer,
          songName:this.$route.params.song
        }
      },
      //设置导航守卫
      beforeRouteEnter(to,from,next){
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
