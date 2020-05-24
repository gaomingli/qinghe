// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: "",
    value2: ""
  },
  // 登录
  login() {
    debugger;
//    wx.switchTab({
//          url: '/pages/index/index'
// });
    wx.login({
      success: function (res) {
        console.log(res)
        //获取登录的临时凭证
        var code = res.code;
        //调用后端，获取微信的session_key,secret
        wx.request({
          url: 'http://qnsg.yiyuncloud.com/user/Login/wechatLogin',
          params: { code: res.code, raw_data: "", signature: "", encrypted_data:""},
          method: "POST",
          success: function (result) {
            console.log(result);
            app.setGlobalUserInfo(e.detail.userInfo);
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  change: function(e) {
    debugger;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})