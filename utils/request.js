var app = getApp();
var host = 'https://qnsg.yiyuncloud.com/';

var urlApi = (url, method, data={}) => {
  let tokenn = wx.getStorageSync("tokenn")||'';
  if ((method === 'post' || method === "POST") && tokenn){
    data.token = tokenn
  }
  return new Promise((res, rej) => {
    wx.request({
      url: host + url,
      header: {},
      data: data,
      method: method,
      success: ret => {
        res(ret);
      },
      fail: rej
    })
  })
}

module.exports = {
  urlApi:urlApi,
  host
}
