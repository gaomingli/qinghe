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
    // menuList: [
    //   { id: 1, menu_img: "/icon/my/pay1.png", menu_name: "待付款", url: "/pages/psychometrics/psychometrics" },
    //   { id: 2, menu_img: "/icon/my/pay2.png", menu_name: "待发货", url: "/pages/news/news" },
    //   { id: 3, menu_img: "/icon/my/pay3.png", menu_name: "待收货", url: "/pages/exercise/exercise" },
    //   { id: 4, menu_img: "/icon/my/pay4.png", menu_name: "已完成", url: "/pages/shopping/shopping" },
    // ],
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
    // let userInfo = wx.getStorageSync("userInfo");
    // console.log(userInfo)
    // if (!userInfo) {
    //   this.setData({ flag: false })
    // } else {
    //   this.setData({ userInfo: userInfo,flag: true})
    // }
    this.queryUserDetail();
  },

  //查询用户详情
  queryUserDetail: function () {
    var that = this;
    var data = {};
    urlApi('user/Profile/index', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
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