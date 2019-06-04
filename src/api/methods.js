// 构造歌单中歌曲的信息数据结构
export function getRightStructure(arr) {
  let a = arr.map(song=>{
    const img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`;
    let b = {
      album:song.albumname,
      name:song.songname,
      singer:song.singer[0].name,
      songmid:song.songmid,
      photo:img,
      url:''
    }
    return b;
  })
  return a;
}


//构造所有歌单本身的数据结构
export function getListsInfoStructure(arr) {
  let a = arr.map(list=>{
    let dissid = list.dissid,
      imgPath = list.imgurl,
      title = list.dissname,
      number = list.listennum,
      author = list.creator.name;
    let num = number > 10000 ? Number(number/10000).toFixed(1) + '万' : number;
    return {dissid,imgPath,title,num,author}
  });
  return a;
}
