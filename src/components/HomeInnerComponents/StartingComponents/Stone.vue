<template>
    <div class="starting_music_slide">
      <ul class="starting_music_list">
        <li class="starting_music_list_item" v-for="item in StartingList">
          <div class="starting_music_box">
            <a class="starting_music_link hover_play_link" href="javascript:;">
              <img :src=item.imgPath class="music_play_img starting_music_img"/>
              <i class="covers"></i>
              <i class="music_play_btn starting_music_play_btn"></i>
            </a>
            <div>
              <h3>
                <a href="javascript:;">
                  <span>{{item.title}}</span>
                </a>
              </h3>
              <p class="starting_music_singer">
                <a class="singer_name" href="javascript:;">{{item.singer}}</a>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "UpToDate",
      computed:{
        StartingList(){
          return this.$store.state.Lists.Starting;
        }
      }
    }
</script>

<style scoped>

</style>
