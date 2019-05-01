const setCookie = (account,password,days) => {
  var date = new Date();
  // 设置保存天数
  date.setTime(date.getTime() + 24*3600*1000*days);
  document.cookie = "account" + "=" + account + ";expires=" + date.toGMTString();
  document.cookie = "password" + "=" + password + ";expires" + date.toGMTString();
}

// 获取cookie
const getCookie = () => {
  if(document.cookie>0){
    var arr = document.cookie.split(';'),
      i,len,
      acc,pas;
    for(i=0,len=arr.length;i<len;i++){
      var arr2 = arr[i].split('=');
      if(arr2[0] == "account"){
        acc=arr2[1]
      }else if(arr2[0]=="password"){
        pas=arr2[1]
      }
    }
    return {acc,pas};
  }
  return null;
}

export {setCookie,getCookie};

