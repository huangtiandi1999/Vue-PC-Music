// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import {Carousel,CarouselItem,Button} from "element-ui";
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Vuex);


/* eslint-disable no-new */
var songList={}
axios.get("../static/data.json")
  .then((response)=>{
    // 将歌单数据保存到songList
    console.log("给劲嗷，铁汁");
    songList=response.data.SongLists;
    var store={
      state:{
        Lists:songList
      }
    }
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    });
  })
  .catch((error)=>{
    console.log(error);
  })



