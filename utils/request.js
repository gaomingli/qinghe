var app = getApp();
var host = 'http://qnsg.yiyuncloud.com/';
var urlApi = (url, method, data) => {
  return new Promise((res, rej) => {
    wx.request({
      url: host + url,
      header: {},
      data: data,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: ret => {
        res(ret);
      },
      fail: rej
    })
  })
}

module.exports = {
  urlApi:urlApi
}
