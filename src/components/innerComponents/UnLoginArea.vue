<template>
    <div class="header_login_wrap">
      <span class="header_mod_login">
        <a href="javascript:;" @click="centerDialogVisible=true" class="header_login_link">登录</a>
        <a class="pay_diamant_vert_btn" href="javascript:;">开通绿钻豪华版</a>
      </span>
      <el-dialog title="登录Music"
                 width="30%"
                 :close-on-press-escape="false"
                 :append-to-body="true"
                 :visible.sync="centerDialogVisible"
                 center>
        <div style="margin: 0 auto;margin-bottom: 20px;width: 85%">
          <el-input placeholder="输入账号" v-model="account" prefix-icon="el-icon-user"></el-input>
        </div>
        <div style="width: 85%;margin: 0 auto">
          <el-input placeholder="输入密码" type="password" v-model="password" prefix-icon="el-icon-key"/>
        </div>
        <span slot="footer">
          <el-button @click="centerDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="requestLogin">登录</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import axios from 'axios'
  import '@/mock/mock.js'
    export default {
      name: "UnLoginArea",
      data(){
        return {
          centerDialogVisible:false,
          account:'',
          password:''
        }
      },
      methods:{
        open(){
          this.$message({
            message:"年忙死了",
            type:'success'
          })
        },
        requestLogin(){
          let that=this;
          let accountVal = {account:this.account,password: this.password}
          axios.post('/login',accountVal).then((res)=>{
            console.log(res.data.state);
            let {code,state,user} = res.data;
            if(code == 200){
              this.$message({
                message: '恭喜你，登陆成功',
                type: 'success',
                duration:2000
              });
            }else{
              this.$message({
                message: '登陆失败，请检查',
                type: 'error',
                duration:2000
              });
            }
          })
            .catch(err=>{
              console.log(err);
            })
        }
      }
    }
</script>

<style scoped>

</style>
