import axios from 'axios'

// 获取qq音乐所有歌单
export function getDiscList() {
  const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const data = Object.assign({},{
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'

  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取qq音乐所有歌手
export function getSingerList() {
  const url = '/a/cgi-bin/musicu.fcg';
  // 参数可以在浏览器network查看,腾讯自己暴露出来的
  const data = Object.assign({},{
    // 需要注意到 data里面的值 不能随意改动  经过测试这里的sex:-100表示所有  sex:0 表示男歌手 sex:1 表示女歌手 sex:2 表示组合
    // 同样的 area:-100也是有含义的 具体自己去qq音乐观察有可能 定期变化
    data:{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}},
    format:'json',
  })
  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res);
  })
}

//根据歌曲songmid获取key值
export function getMusicJson(songmid) {
  const url = '/b/cgi-bin/musicu.fcg';
  const data = Object.assign({},{
    g_tk:905549040,
    hostUin: 0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform: 'yqq.json',
    data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"5611510712","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"5611510712","songmid":[songmid],"songtype":[0],"uin":"1491433427","loginflag":1,"platform":"20"}},"comm":{"uin":1491433427,"format":"json","ct":24,"cv":0}}
  });

  return axios.get(url,{params:data})
    .then(res=>{
      return Promise.resolve(res);
    })
}

//通过singermid获取歌手信息以及作品详情
// 必须的参数 可以在网站的url上一个一个的删除刷新看数据是否变化
// 此处的接口 需要的查询参数 根据data选项的singermid属性的不同  会返回不同的歌手信息
// 而singermid我们在进入歌手列表页时已经通过接口获取到了   在getSingerList()这里
export function getSingerDetailsInfo(singermid) {
  const url = '/c/cgi-bin/musicu.fcg';
  const data = Object.assign({},{
    data:{"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":singermid,"sin":0,"num":10},"module":"music.web_singer_info_svr"}}
  })

  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res);
  })
}




