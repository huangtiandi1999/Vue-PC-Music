<template>
    <div class="header_login_wrap">
      <span class="header_mod_login">
        <!-- 使用mouse类事件判断鼠标悬浮 -->
        <a href="javascript:;" class="header_logined_link">
          <img class="user_head_img" :src="userinfo.headimg"/>
        </a>
         <a class="pay_diamant_vert_btn" href="javascript:;">开通绿钻豪华版</a>
      </span>
      <!-- 用户信息 -->
      <div class="userinfo_area">
        <div class="user_data">
          <a>
            <img :src="userinfo.headimg">
          </a>
          <div>

          </div>
        </div>
        <div class="service_toolbar">
          
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "LoginAfter",
      data:function(){
        return {
          userinfo:this.$store.getters.User
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
