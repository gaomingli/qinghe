// pages/boots/boots.js
var t = getApp();
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: options.path,
      type:options.type
    })
  },

  onGotUserInfo(e) {
    var that = this
    if (e.detail.errMsg ==='getUserInfo:ok'){
      wx.login({
        success: function (a) {
          wx.getUserInfo({
            success: function (e) {
            
              let params={};
              params['signature'] = e.signature;
              params['raw_data'] = e.rawData;
              params['iv'] = e.iv;
              params['encrypted_data'] = e.encryptedData;
              params['code'] = a.code;
              urlApi("/user/Login/wechatLogin","post",params).then((res)=>{
                if(res.data.code){
                  wx.setStorageSync("userInfo", t);
                  wx.setStorageSync("tokenn",res.data.data.token);
                  if(that.data.type==1){
                    wx.navigateTo({
                      url: that.data.path,
                    })
                  }else{
                   wx.switchTab({
                     url: that.data.path
                   }) 
                  }
                }else{
                  wx.showToast({
                    title: res.data.msg
                  })
                }            
              })
            }
          })
        }
      });
    }
  },
  refuse: function() {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
})