// pages/my/my.js
var {
  jsEvent
} = require("../../utils/util.js");
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    userInfo: null,
      userDetail: '',//用户详情
    tokenn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getTabBar().setData({
      tabbarIndex: 4
    })
    let tokenn = wx.getStorageSync("tokenn");
    console.log("tokenn============" + tokenn)
    this.setData({
      tokenn: tokenn
    })
// 清除地址信息缓存
    wx.removeStorageSync("addressInfo");
    let userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo)
    if (!userInfo) {
      this.setData({ flag: false })
    } else {
      this.setData({ userInfo: userInfo,flag: true})
    }
    this.queryUserDetail();
    this.queryMenuIsShow();
  },

  //菜单显示问题:0隐藏 1显示
  queryMenuIsShow: function () {
    var that = this;
    urlApi('user/profile/nav', "post", {}).then((res) => {
      console.log("res======", res);
      if (res.data.code) {
        that.setData({
          isShowMenu: res.data.data.status,
        })

      }
    })
  },

  //查询用户详情
  queryUserDetail: function () {
    var that = this;
    var data = {};
    urlApi('user/Profile/index', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        res.data.data.coin=res.data.data.coin.split('.')[0];
        that.setData({
          userDetail: res.data.data
        })
      } 
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onJsEvent: function (e) {
    jsEvent(e);
  }
})