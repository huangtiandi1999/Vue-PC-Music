import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Singerlist from '../components/Singerlist'
import Singer from '../components/SingerIndex'
import player from '../components/player'
import Playlist from '../components/Playlist'
Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      components:{
        default:Home
      }
    },
    {
      path:'/singerlist',
      name:'Singerlist',
      components:{
        default:Singerlist
      }
    },
    {
      path:'/playlist',
      name:'Playlist',
      component:Playlist
    },
    {
      path:'/singer/:sn',
      name:"Singer",
      component:Singer
    },
    {
      path:'/player',
      name:"player",
      component:player
    }
  ]
})
