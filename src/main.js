// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import {Carousel,CarouselItem,Dialog,Button,Input,Loading,Message} from "element-ui";
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Carousel);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(CarouselItem);
Vue.use(Vuex);

Vue.prototype.$message = Message;
Vue.prototype.myWindow = window;
/* eslint-disable no-new */
var songList={}
var singers=[]
var music=[]
axios.get("../static/data.json")
  .then((response)=>{
    // 将歌单数据保存到songList
    console.log("给劲嗷，铁汁");
    songList=response.data.SongLists;
    singers=response.data.Singer.map(singer=>{
      return {
        name:singer.name,
        id:singer.id,
        photo:require("./assets/images/singer/"+singer.name+".jpg"),
        photo1:require("./assets/images/SingerInfoImg/"+singer.name+".jpg"),
        introduce:singer.introduce,
        fans:singer.fans
      }
    });
    music=response.data.Music;
    const state={
      showHeader:true,
      Lists:songList,
      Singers:singers,
      Music:music,
      Login:false,
      user:JSON.parse(window.sessionStorage.getItem('user')),
      nowPlay:null,
      playListSong:[],

    }
    const getters={
      isShow(state) {
        return state.showHeader;
      },
      isLogin(state){
        return state.Login;
      },
      User(state){
        return state.user;
      },
      NowPlay(state){
        return state.nowPlay;
      },
      ListSong(state){
        return state.playListSong;
      },

    }
    const mutations={
      hide(state){
        state.showHeader=false;
      },
      show(state){
        state.showHeader=true;
      },
      loginIn(state){
        state.Login = true;
      },
      loginOut(state){
        state.Login = false;
      },
      setUser(state,user){
        state.user=user;
        // 将用户信息保存到当前回话
        window.sessionStorage.setItem('user',JSON.stringify(user));
      },
      setNowPlay(state,songinfo){
        state.nowPlay=songinfo;
      },
      AddSong(state,songinfo){
        state.playListSong.push(songinfo);
      }
    }
    const actions={
      hideHeader(context){
        context.commit('hide');
      },
      showHeader(context){
        context.commit('show');
      },
      loginInMusic(context){
        context.commit('loginIn');
      },
      loginOutMusic(context){
        context.commit('loginOut');
      },
      SetUser(context,user){
        context.commit('setUser',user)
      },
      SetNowPlay(context,songinfo){
        context.commit('setNowPlay',songinfo);
      },
      AddSongToList(context,songinfo){
        context.commit('AddSong',songinfo);
      }
    }
    const store=new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })
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



