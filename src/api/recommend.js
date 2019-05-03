import axios from 'axios'

export function getDiscList() {
  // 获取qq音乐所有歌单
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

export function getSingerList() {
  // 获取qq音乐所有歌手
  const url = '/a/cgi-bin/musicu.fcg';
  // 参数可以在浏览器network查看,腾讯自己暴露出来的
  const data = Object.assign({},{
    data:{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}},
    format:'json',
  })
  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res);
  })
}

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

