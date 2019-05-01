<template>
    <div class="header_login_wrap" @mouseleave="isDrop=false">
      <span class="header_mod_login">
        <!-- 使用mouse类事件判断鼠标悬浮 -->
        <a href="javascript:;" class="header_logined_link" @mouseenter="isDrop=true">
          <img class="user_head_img" :src="userinfo.headimg"/>
        </a>
         <a class="pay_diamant_vert_btn" href="javascript:;">开通绿钻豪华版</a>
      </span>
      <!-- 用户信息 -->
      <div class="userinfo_area" :class="{'drop':isDrop}" @mouseleave="isDrop=false">
        <div class="user_data">
          <a class="user_img_link">
            <img class="user_data_cover_img" :src="userinfo.headimg">
          </a>
          <div class="user_data_account">
            <div class="user_data_account_name"><a href="javascript:;">{{userinfo.name}}</a></div>
            <div class="user_service_lv">
              <a href="javacript:;"><img src="../../assets/images/svip_g.png"/></a>
              <a href="javascript:;"><img src="../../assets/images/sui_g.png"/></a>
            </div>
          </div>
        </div>
        <div class="service_toolbar">
          <div v-for="item of toolbar" class="service_toolbar_item">
            <div class="toolbar_item_title"><a href="javascript:;">{{item.title}}</a></div>
            <div class="toolbar_item_des">
              {{item.text}}
            </div>
            <a class="subscribe_ser_btn" v-show="item.service" href="javascript:;">开通</a>
          </div>
          <div class="service_toolbar_item">
            <!-- 后续开发评论回复模块再回来完善这里 -->
            <div class="toolbar_item_title"><a href="javascript:;">评论通知</a></div>
            <div class="toolbar_item_des">暂时没有任何通知</div>
            <div></div>
          </div>
          <div class="service_toolbar_item">
            <div class="toolbar_item_title"><a href="javascript:;" @click="loginOut">退出Music登录</a></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "LoginAfter",
      data:function(){
        return {
          userinfo:this.$store.getters.User,
          isDrop:false,
          toolbar:[
            {title:"绿钻豪华版",text:"开通立即赠送付费音乐包",service:true},
            {title:"付费音乐包",text:"畅享千万包月曲库",service:true}
          ]
        }
      },
      methods:{
        loginOut(){
        //   更新vuex中用户状态
          this.$store.dispatch('loginOutMusic');
          this.$store.dispatch('SetUser',null);
          window.sessionStorage.removeItem('user');
          console.log("退出成功");
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
