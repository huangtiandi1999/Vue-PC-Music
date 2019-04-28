import Mock from 'mockjs'
import {users} from './user'


const returnData = (opt) => {
  //对象的解构赋值
  let {account,password} = JSON.parse(opt.body);
  let user = null;
  let hasuser = users.some( person => {
    if (person.account == account && person.password == password){
      //深度拷贝存在的账号
      user = JSON.parse(JSON.stringify(person));
      return true;
    } else{
      return false;
    }
  });
  if(hasuser){
    //使用状态码code判断登录是否成功
    return {code:200,state:"登陆成功",user};
  }
  return {code:500,state:"账号或密码错误"};

}
Mock.mock('/login','post',returnData)


